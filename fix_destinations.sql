UPDATE destinations d
SET 
  image_url = t.image_url,
  description = 'Experience the wonders of ' || d.name || ', ' || d.country || '. A premier travel destination.'
FROM tours t
WHERE t.destination_id = d.id;
