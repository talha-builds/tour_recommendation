-- Mark the first 3 tours as featured so they appear on the home page
UPDATE tours
SET is_featured = true
WHERE id IN (
  SELECT id FROM tours ORDER BY created_at ASC LIMIT 3
);
