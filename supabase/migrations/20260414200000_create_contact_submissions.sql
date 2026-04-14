-- Rate limiting table for contact form spam protection
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_contact_submissions_ip ON contact_submissions(ip_address, created_at);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email, created_at);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (edge functions use service role key)
CREATE POLICY "Service role only" ON contact_submissions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
