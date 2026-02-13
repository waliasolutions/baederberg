// All project images for CMS Media Library sync
// Paths must point to /public/ or /lovable-uploads/ (build-safe)
// Never use /src/assets/ paths — Vite hashes those in production builds

export interface InitialMediaEntry {
  url: string;
  filename: string;
  folder: string;
}

export const initialMedia: InitialMediaEntry[] = [
  // === Hero images ===
  { url: '/lovable-uploads/bad-hero.jpg', filename: 'bad-hero.jpg', folder: 'hero' },
  { url: '/lovable-uploads/innenausbau-hero.jpg', filename: 'innenausbau-hero.jpg', folder: 'hero' },
  { url: '/lovable-uploads/kueche-hero.jpg', filename: 'kueche-hero.jpg', folder: 'hero' },

  // === Service images ===
  { url: '/lovable-uploads/bad-service.jpg', filename: 'bad-service.jpg', folder: 'services' },
  { url: '/lovable-uploads/innenausbau-service.jpg', filename: 'innenausbau-service.jpg', folder: 'services' },
  { url: '/lovable-uploads/kueche-service.jpg', filename: 'kueche-service.jpg', folder: 'services' },

  // === General ===
  { url: '/lovable-uploads/modern-bathroom-interior.jpg', filename: 'modern-bathroom-interior.jpg', folder: 'general' },

  // === Branding ===
  { url: '/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png', filename: 'logo-1.png', folder: 'branding' },
  { url: '/lovable-uploads/7b5a5a87-6002-4a90-aa3a-50bb91b165bf.png', filename: 'logo-2.png', folder: 'branding' },

  // === Gallery: public/images ===
  { url: '/images/bathroom-modern.jpg', filename: 'bathroom-modern.jpg', folder: 'gallery' },
  { url: '/images/bathroom-modern-optimized.jpg', filename: 'bathroom-modern-optimized.jpg', folder: 'gallery' },
  { url: '/images/interior-living.jpg', filename: 'interior-living.jpg', folder: 'gallery' },
  { url: '/images/interior-living-optimized.jpg', filename: 'interior-living-optimized.jpg', folder: 'gallery' },
  { url: '/images/interior-modern.jpg', filename: 'interior-modern.jpg', folder: 'gallery' },
  { url: '/images/kitchen-modern.jpg', filename: 'kitchen-modern.jpg', folder: 'gallery' },

  // === Gallery: Badumbau (a–v) ===
  { url: '/images/badumbau-a.jpg', filename: 'badumbau-a.jpg', folder: 'gallery' },
  { url: '/images/badumbau-b.jpg', filename: 'badumbau-b.jpg', folder: 'gallery' },
  { url: '/images/badumbau-c.jpg', filename: 'badumbau-c.jpg', folder: 'gallery' },
  { url: '/images/badumbau-d.jpg', filename: 'badumbau-d.jpg', folder: 'gallery' },
  { url: '/images/badumbau-e.jpg', filename: 'badumbau-e.jpg', folder: 'gallery' },
  { url: '/images/badumbau-f.jpg', filename: 'badumbau-f.jpg', folder: 'gallery' },
  { url: '/images/badumbau-g.jpg', filename: 'badumbau-g.jpg', folder: 'gallery' },
  { url: '/images/badumbau-h.jpg', filename: 'badumbau-h.jpg', folder: 'gallery' },
  { url: '/images/badumbau-i.jpg', filename: 'badumbau-i.jpg', folder: 'gallery' },
  { url: '/images/badumbau-j.jpg', filename: 'badumbau-j.jpg', folder: 'gallery' },
  { url: '/images/badumbau-k.jpg', filename: 'badumbau-k.jpg', folder: 'gallery' },
  { url: '/images/badumbau-l.jpg', filename: 'badumbau-l.jpg', folder: 'gallery' },
  { url: '/images/badumbau-m.jpg', filename: 'badumbau-m.jpg', folder: 'gallery' },
  { url: '/images/badumbau-n.jpg', filename: 'badumbau-n.jpg', folder: 'gallery' },
  { url: '/images/badumbau-o.jpg', filename: 'badumbau-o.jpg', folder: 'gallery' },
  { url: '/images/badumbau-p.jpg', filename: 'badumbau-p.jpg', folder: 'gallery' },
  { url: '/images/badumbau-q.jpg', filename: 'badumbau-q.jpg', folder: 'gallery' },
  { url: '/images/badumbau-r.jpg', filename: 'badumbau-r.jpg', folder: 'gallery' },
  { url: '/images/badumbau-s.jpg', filename: 'badumbau-s.jpg', folder: 'gallery' },
  { url: '/images/badumbau-t.jpg', filename: 'badumbau-t.jpg', folder: 'gallery' },
  { url: '/images/badumbau-u.jpg', filename: 'badumbau-u.jpg', folder: 'gallery' },
  { url: '/images/badumbau-v.jpg', filename: 'badumbau-v.jpg', folder: 'gallery' },

  // === Gallery: Innenausbau (a–e) ===
  { url: '/images/innenausbau-a.jpg', filename: 'innenausbau-a.jpg', folder: 'gallery' },
  { url: '/images/innenausbau-b.jpg', filename: 'innenausbau-b.jpg', folder: 'gallery' },
  { url: '/images/innenausbau-c.jpg', filename: 'innenausbau-c.jpg', folder: 'gallery' },
  { url: '/images/innenausbau-d.jpg', filename: 'innenausbau-d.jpg', folder: 'gallery' },
  { url: '/images/innenausbau-e.jpg', filename: 'innenausbau-e.jpg', folder: 'gallery' },

  // === Gallery: Projects (from public/assets/projects/) ===
  { url: '/assets/projects/built-in-wardrobe.jpg', filename: 'built-in-wardrobe.jpg', folder: 'gallery' },
  { url: '/assets/projects/contemporary-kitchen-island.jpg', filename: 'contemporary-kitchen-island.jpg', folder: 'gallery' },
  { url: '/assets/projects/entryway-built-in-storage.jpg', filename: 'entryway-built-in-storage.jpg', folder: 'gallery' },
  { url: '/assets/projects/farmhouse-kitchen-rustic.jpg', filename: 'farmhouse-kitchen-rustic.jpg', folder: 'gallery' },
  { url: '/assets/projects/guest-bathroom-compact.jpg', filename: 'guest-bathroom-compact.jpg', folder: 'gallery' },
  { url: '/assets/projects/master-bathroom-spa.jpg', filename: 'master-bathroom-spa.jpg', folder: 'gallery' },
  { url: '/assets/projects/modern-bathroom-renovation.jpg', filename: 'modern-bathroom-renovation.jpg', folder: 'gallery' },
  { url: '/assets/projects/modern-kitchen-induction.jpg', filename: 'modern-kitchen-induction.jpg', folder: 'gallery' },

  // === Regions (from public/assets/regions/) ===
  { url: '/assets/regions/pfaffikon-hero.jpg', filename: 'pfaffikon-hero.jpg', folder: 'regions' },
  { url: '/assets/regions/pfaffikon-interior.jpg', filename: 'pfaffikon-interior.jpg', folder: 'regions' },
  { url: '/assets/regions/richterswil-hero.jpg', filename: 'richterswil-hero.jpg', folder: 'regions' },
  { url: '/assets/regions/richterswil-interior.jpg', filename: 'richterswil-interior.jpg', folder: 'regions' },
  { url: '/assets/regions/zurich-hero.jpg', filename: 'zurich-hero.jpg', folder: 'regions' },
  { url: '/assets/regions/zurich-interior.jpg', filename: 'zurich-interior.jpg', folder: 'regions' },
];
