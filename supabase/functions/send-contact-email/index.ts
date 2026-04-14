import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.88.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface ContactFormPayload extends ContactFormData {
  turnstileToken?: string;
  honeypot?: string;
  formDuration?: number;
}

interface ValidationError {
  field: string;
  message: string;
}

// --- Spam Protection: Turnstile Verification ---

async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: ip,
        }),
      }
    );
    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

// --- Spam Protection: Rate Limiting ---

async function checkRateLimit(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  email: string
): Promise<{ allowed: boolean; reason?: string }> {
  // Cleanup: delete entries older than 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  await supabase
    .from("contact_submissions")
    .delete()
    .lt("created_at", oneDayAgo);

  // Check IP rate limit: max 3 submissions per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: ipCount } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", oneHourAgo);

  if (ipCount !== null && ipCount >= 3) {
    return {
      allowed: false,
      reason: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    };
  }

  // Check email rate limit: max 5 submissions per 24 hours
  const { count: emailCount } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .gte("created_at", oneDayAgo);

  if (emailCount !== null && emailCount >= 5) {
    return {
      allowed: false,
      reason: "Zu viele Anfragen von dieser E-Mail-Adresse. Bitte versuchen Sie es später erneut.",
    };
  }

  return { allowed: true };
}

async function logSubmission(
  supabase: ReturnType<typeof createClient>,
  ip: string,
  email: string
): Promise<void> {
  await supabase
    .from("contact_submissions")
    .insert({ ip_address: ip, email: email.toLowerCase() });
}

// --- Input Validation ---

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateFormData(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name: required, max 100 chars
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name ist erforderlich" });
  } else if (data.name.length > 100) {
    errors.push({ field: "name", message: "Name darf maximal 100 Zeichen haben" });
  }

  // Email: required, valid format
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: "email", message: "E-Mail ist erforderlich" });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: "email", message: "Ungültige E-Mail-Adresse" });
  }

  // Phone: optional, max 30 chars
  if (data.phone && data.phone.length > 30) {
    errors.push({ field: "phone", message: "Telefonnummer darf maximal 30 Zeichen haben" });
  }

  // Service: optional, whitelist
  const validServices = ["Badumbau", "Innenausbau", ""];
  if (data.service && !validServices.includes(data.service)) {
    errors.push({ field: "service", message: "Ungültige Leistungsauswahl" });
  }

  // Message: optional, max 2000 chars
  if (data.message && data.message.length > 2000) {
    errors.push({ field: "message", message: "Nachricht darf maximal 2000 Zeichen haben" });
  }

  return errors;
}

// --- Email Formatting ---

function formatDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zurich",
  };
  return now.toLocaleDateString("de-CH", options) + " Uhr";
}

function createEmailHtml(data: ContactFormData): string {
  const escapedName = data.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedEmail = data.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedPhone = data.phone ? data.phone.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Nicht angegeben";
  const escapedService = data.service ? data.service.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Nicht angegeben";
  const escapedMessage = data.message
    ? data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")
    : "Keine Nachricht";

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1e3a5f; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Neue Kontaktanfrage</h1>
              <p style="color: #a3bfdb; margin: 10px 0 0 0; font-size: 16px;">von ${escapedName}</p>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1e3a5f; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">Kontaktdaten</h2>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #666666; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333333; font-weight: bold;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">E-Mail:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}" style="color: #1e3a5f; text-decoration: none;">${escapedEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Telefon:</td>
                  <td style="padding: 8px 0; color: #333333;">${escapedPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Leistung:</td>
                  <td style="padding: 8px 0; color: #333333;">${escapedService}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">Nachricht</h2>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; color: #333333; line-height: 1.6;">
                ${escapedMessage}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #999999; font-size: 12px;">Gesendet am: ${formatDate()}</p>
              <p style="margin: 5px 0 0 0; color: #999999; font-size: 12px;">Via: baederberg.ch Kontaktformular</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// --- Fake success response (for honeypot/timing traps — don't alert bots) ---

function fakeSuccessResponse(): Response {
  return new Response(
    JSON.stringify({ success: true, message: "E-Mail erfolgreich gesendet" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
}

// --- Main Handler ---

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SMTP2GO_API_KEY = Deno.env.get("SMTP2GO_API_KEY");
    if (!SMTP2GO_API_KEY) {
      console.error("SMTP2GO_API_KEY is not configured");
      throw new Error("E-Mail-Service ist nicht konfiguriert");
    }

    const payload: ContactFormPayload = await req.json();
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // --- Layer 1: Honeypot check (silent reject) ---
    if (payload.honeypot) {
      console.log("Spam blocked: honeypot field filled");
      return fakeSuccessResponse();
    }

    // --- Layer 2: Timing check (silent reject) ---
    if (typeof payload.formDuration === "number" && payload.formDuration < 3000) {
      console.log("Spam blocked: form submitted too quickly", payload.formDuration, "ms");
      return fakeSuccessResponse();
    }

    // --- Layer 3: Turnstile CAPTCHA verification ---
    if (!payload.turnstileToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Sicherheitsüberprüfung fehlgeschlagen. Bitte laden Sie die Seite neu.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const turnstileValid = await verifyTurnstileToken(payload.turnstileToken, clientIp);
    if (!turnstileValid) {
      console.log("Spam blocked: Turnstile verification failed");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Sicherheitsüberprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // --- Layer 4: Input validation ---
    const formData: ContactFormData = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
    };

    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Validierungsfehler",
          details: validationErrors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // --- Layer 5: Rate limiting ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rateCheck = await checkRateLimit(supabase, clientIp, formData.email);
    if (!rateCheck.allowed) {
      console.log("Spam blocked: rate limit exceeded for", clientIp, formData.email);
      return new Response(
        JSON.stringify({ success: false, error: rateCheck.reason }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // --- Send email via SMTP2GO ---
    const emailPayload = {
      api_key: SMTP2GO_API_KEY,
      to: ["info@baederberg.ch"],
      cc: ["info@walia-solutions.ch"],
      sender: "Bäderberg Kontaktformular <kontakt@keine-sorge.ch>",
      subject: `Neue Kontaktanfrage von ${formData.name}`,
      html_body: createEmailHtml(formData),
      custom_headers: [
        { header: "Reply-To", value: formData.email }
      ]
    };

    console.log("Sending email via SMTP2GO...");

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok || result.data?.error) {
      console.error("SMTP2GO error:", result);
      throw new Error(result.data?.error || "E-Mail konnte nicht gesendet werden");
    }

    console.log("Email sent successfully:", result);

    // Log submission for rate limiting
    await logSubmission(supabase, clientIp, formData.email);

    return new Response(
      JSON.stringify({ success: true, message: "E-Mail erfolgreich gesendet" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
