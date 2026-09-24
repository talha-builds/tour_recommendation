-----------------------------------------------------------
-- WISHLISTS TABLE
-----------------------------------------------------------
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Prevent a user from saving the same tour multiple times
  UNIQUE(user_id, tour_id)
);

-- Enable RLS
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own wishlist."
  ON public.wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist."
  ON public.wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist."
  ON public.wishlists FOR DELETE
  USING (auth.uid() = user_id);

-- Ensure permissions are granted to the roles (since we wiped default privileges earlier)
GRANT ALL PRIVILEGES ON TABLE public.wishlists TO anon, authenticated;
