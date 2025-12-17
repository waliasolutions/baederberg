-- Create role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- User roles table (secure role storage)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Content schema table (Single Source of Truth for field definitions)
CREATE TABLE public.content_schema (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  schema JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main content table
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content JSONB NOT NULL,
  is_draft BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_key, content_key)
);

-- Content revisions for version history
CREATE TABLE public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media/Images table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_url TEXT NOT NULL,
  optimized_url TEXT,
  webp_url TEXT,
  alt_text TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  folder TEXT DEFAULT '/',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes/Colors table
CREATE TABLE public.themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  colors JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_schema ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for content_schema (public read, admin write)
CREATE POLICY "Anyone can read content schema"
  ON public.content_schema
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage content schema"
  ON public.content_schema
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for content (public read published, admin/editor write)
CREATE POLICY "Anyone can read published content"
  ON public.content
  FOR SELECT
  TO anon, authenticated
  USING (is_draft = false AND (scheduled_for IS NULL OR scheduled_for <= NOW()));

CREATE POLICY "Admins and editors can read all content"
  ON public.content
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can manage content"
  ON public.content
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can update content"
  ON public.content
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete content"
  ON public.content
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for content_revisions
CREATE POLICY "Admins and editors can view revisions"
  ON public.content_revisions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can create revisions"
  ON public.content_revisions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for media (public read, admin/editor write)
CREATE POLICY "Anyone can view media"
  ON public.media
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins and editors can manage media"
  ON public.media
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for themes (public read active, admin write)
CREATE POLICY "Anyone can read active theme"
  ON public.themes
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can read all themes"
  ON public.themes
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage themes"
  ON public.themes
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_themes_updated_at
  BEFORE UPDATE ON public.themes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-media',
  'cms-media',
  true,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
);

-- Storage policies for cms-media bucket
CREATE POLICY "Anyone can view cms-media"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'cms-media');

CREATE POLICY "Admins and editors can upload to cms-media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'cms-media' AND 
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Admins and editors can update cms-media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'cms-media' AND 
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Admins can delete from cms-media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_content_section_key ON public.content(section_key);
CREATE INDEX idx_content_is_draft ON public.content(is_draft);
CREATE INDEX idx_content_revisions_content_id ON public.content_revisions(content_id);
CREATE INDEX idx_media_folder ON public.media(folder);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);