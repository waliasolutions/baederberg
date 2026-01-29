import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

interface ValidationError {
  field: string;
  message: string;
}

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

    const formData: ContactFormData = await req.json();

    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Validierungsfehler", 
          details: validationErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Prepare email via SMTP2GO
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
