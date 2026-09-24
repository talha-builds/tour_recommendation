-- WARNING: This will completely delete all tables and data in the public schema!

-- 1. Drop the entire public schema and all its contents
DROP SCHEMA public CASCADE;

-- 2. Recreate the public schema
CREATE SCHEMA public;

-- 3. Restore the default permissions required by Supabase
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;
GRANT ALL ON SCHEMA public TO service_role;

-- At this point, your Supabase project's public schema is completely clean and reset.
-- You can now run any future migrations or schema setups.
