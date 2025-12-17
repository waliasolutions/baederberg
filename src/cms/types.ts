// CMS TypeScript Types

export interface User {
  id: string;
  email: string;
  role?: 'admin' | 'editor';
}

export interface ContentItem {
  id: string;
  section_key: string;
  content_key: string;
  content: any;
  is_draft: boolean;
  published_at: string | null;
  scheduled_for: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentRevision {
  id: string;
  content_id: string;
  content: any;
  created_by: string | null;
  created_at: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  original_url: string;
  optimized_url: string | null;
  webp_url: string | null;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  folder: string;
  created_by: string | null;
  created_at: string;
}

export interface Theme {
  id: string;
  name: string;
  is_active: boolean;
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor?: string;
    textColor?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CMSState {
  content: Record<string, any>;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
  lastSaved: Date | null;
}
