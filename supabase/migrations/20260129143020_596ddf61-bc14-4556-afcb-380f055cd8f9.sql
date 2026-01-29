-- Create a SECURITY DEFINER function to check if any admin exists
-- This allows anonymous users to check without RLS blocking the query
CREATE OR REPLACE FUNCTION public.check_admin_exists()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE role = 'admin' 
    LIMIT 1
  );
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.check_admin_exists() TO anon;
GRANT EXECUTE ON FUNCTION public.check_admin_exists() TO authenticated;