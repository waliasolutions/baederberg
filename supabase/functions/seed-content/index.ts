import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Default content to seed - must match schema.ts
const defaultContent = {
  hero: {
    slides: [
      {
        heading: "Wir bauen Ihr Bad gemeinsam um",
        ctaText: "Mehr erfahren",
        ctaLink: "/badumbau",
        backgroundImage: "/images/bathroom-modern.jpg"
      },
      {
        heading: "Facharbeiten im Innenausbau",
        ctaText: "Mehr erfahren",
        ctaLink: "/innenausbau",
        backgroundImage: "/images/interior-living.jpg"
      }
    ]
  },
  contact: {
    heading: "Kontakt",
    subheading: "Wir freuen uns auf Ihre Anfrage",
    phone: "+41 76 753 44 78",
    email: "info@baederberg.ch",
    company: "Bäderberg GmbH",
    street: "Zugerstrasse 18",
    city: "8805 Richterswil"
  },
  about: {
    heading: "Ihr Bad, Ihr Innenausbau",
    paragraph1: "Wir sind Handwerker aus der Region Zürich. Wir planen und bauen Bäder und Innenräume – sorgfältig und nach Ihren Wünschen.",
    paragraph2: "Alles aus einer Hand. Mit persönlicher Betreuung von Anfang bis Ende.",
    features: [
      {
        icon: "Heart",
        title: "Persönliche Betreuung",
        description: "Ihr persönlicher Bauleiter begleitet Ihr Projekt von Anfang bis Ende."
      },
      {
        icon: "Award",
        title: "Sorgfältige Arbeit",
        description: "Wir achten auf Details und arbeiten sauber."
      },
      {
        icon: "Smile",
        title: "Garantie inklusive",
        description: "Elektroarbeiten und Garantie sind bei uns immer dabei."
      }
    ]
  },
  testimonials: {
    heading: "Zufriedene Kunden",
    items: [
      { author: "Motorcycle Driver", quote: "Herr Capatina hat ein tolles und fähiges Team beisammen. Unsere Wünsche wurden voll und ganz umgesetzt.", rating: 5, project: "Badumbau" },
      { author: "Nicoleta Salvadori-Curniuc", quote: "Sehr zufrieden mit der kompletten Renovation unserem Badezimmer. Nach 3 Jahren funktioniert alles immer einwandfrei.", rating: 5, project: "Badumbau" },
      { author: "Christian Hess", quote: "Herr Capatina und sein Team haben unsere Wünsche und Vorgaben schnell, zuverlässig und mit höchster Professionalität umgesetzt.", rating: 5, project: "Badumbau" },
      { author: "Acilas Physiotherapie", quote: "Serghei und sein Team waren stets freundlich, gründlich und pünktlich.", rating: 5, project: "Innenausbau" },
      { author: "Kodeli", quote: "Die Bäderberg GmbH hat unser Badezimmer komplett umgebaut. Herr Capatina hat uns sehr kompetent und sorgfältig beraten.", rating: 5, project: "Badumbau" },
      { author: "Derk Mous", quote: "Grosser Umbau mit mehreren Bädern super abgeliefert! Kundenorientiert, präzise, schnell.", rating: 5, project: "Badumbau" },
      { author: "Patricia Schmid", quote: "Sehr zu empfehlen! Extrem kompetent, lösungsorientiert und in zügigem Tempo.", rating: 5, project: "Badumbau" },
      { author: "Boris Radoicic", quote: "Das Team Bäderberg ist sehr kompetent, freundlich und professionell.", rating: 5, project: "Innenausbau" },
      { author: "Márton Szőnyi", quote: "Ich habe meine Badezimmerrenovierung von Bäderberg GmbH machen lassen und bin sehr glücklich mit dem Ergebnis.", rating: 5, project: "Badumbau" },
      { author: "Lionel Sigrist", quote: "Von Beginn weg war die Zusammenarbeit super. Die Bäderberg GmbH ist auf unsere Wünsche eingegangen.", rating: 5, project: "Badumbau" },
      { author: "Claudio Hofer", quote: "Ich habe mit Serghei zwei Badezimmer umbauen lassen. Super Arbeit und angenehmer Kontakt.", rating: 5, project: "Badumbau" },
      { author: "Benjamin Tacquet", quote: "Wir haben mit Bäderberg eine komplette Boden- und Badsanierung durchgeführt und sind mit dem Ergebnis sehr zufrieden.", rating: 5, project: "Badumbau" },
      { author: "Kay Moeller-Heske", quote: "Klare Weiterempfehlung wg Verlässlichkeit, Erreichbarkeit, Kreativität, Qualität der Umsetzung.", rating: 5, project: "Innenausbau" },
      { author: "Katharina Gut", quote: "Wir können die Firma Bäderberg unbedingt weiter empfehlen! Hoch-professionelle Arbeit.", rating: 5, project: "Innenausbau" },
      { author: "Rolf Haller", quote: "Durchgehend freundlich und professionell - stets Lösungsorientiert. Alles aus einer Hand zum fairen Preis.", rating: 5, project: "Innenausbau" },
      { author: "Coiffure Vogue Wädenswil", quote: "Top Leistung, saubere schöne Arbeit, super freundlich.", rating: 5, project: "Innenausbau" },
      { author: "victor poalelungi", quote: "Top Team mit Top Service! Es ist erstaunlich wie schnell und qualitativ die Arbeit gemacht wird!", rating: 5, project: "Innenausbau" },
      { author: "Albert Peter", quote: "Danke vielmals für das Traumbadezimmer, das ihr genau nach meinen Wünschen so professionell erledigt habt.", rating: 5, project: "Badumbau" },
      { author: "Läubli Daniel", quote: "Super Arbeit! Sauber und zuverlässig.", rating: 5, project: "Innenausbau" },
      { author: "Marzia Mura", quote: "Herr Capatina hat unsere beiden Duschräume renoviert. Wir sind mit der Arbeit sehr zufrieden.", rating: 5, project: "Badumbau" }
    ]
  }
};

const defaultTheme = {
  name: "Default",
  colors: {
    primaryColor: "#0ea5e9",
    secondaryColor: "#f1f5f9",
    accentColor: "#0284c7",
    backgroundColor: "#ffffff",
    textColor: "#1e293b"
  },
  is_active: true
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user } } = await supabaseUser.auth.getUser();
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user is admin
    const { data: userRole } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!userRole) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: string[] = [];

    // Seed content
    for (const [sectionKey, sectionContent] of Object.entries(defaultContent)) {
      for (const [contentKey, content] of Object.entries(sectionContent as Record<string, any>)) {
        // Check if content already exists
        const { data: existing } = await supabaseAdmin
          .from("content")
          .select("id")
          .eq("section_key", sectionKey)
          .eq("content_key", contentKey)
          .maybeSingle();

        if (!existing) {
          const { error } = await supabaseAdmin
            .from("content")
            .insert({
              section_key: sectionKey,
              content_key: contentKey,
              content: content,
              is_draft: false,
              published_at: new Date().toISOString(),
              created_by: user.id,
              updated_by: user.id
            });

          if (error) {
            console.error(`Error seeding ${sectionKey}.${contentKey}:`, error);
          } else {
            results.push(`Seeded: ${sectionKey}.${contentKey}`);
          }
        } else {
          results.push(`Skipped (exists): ${sectionKey}.${contentKey}`);
        }
      }
    }

    // Seed default theme if none exists
    const { data: existingThemes } = await supabaseAdmin
      .from("themes")
      .select("id")
      .limit(1);

    if (!existingThemes || existingThemes.length === 0) {
      const { error: themeError } = await supabaseAdmin
        .from("themes")
        .insert(defaultTheme);

      if (themeError) {
        console.error("Error seeding theme:", themeError);
      } else {
        results.push("Seeded: default theme");
      }
    } else {
      results.push("Skipped (exists): theme");
    }

    console.log("Seed completed:", results);

    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Seed error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
