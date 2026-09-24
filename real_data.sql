
-- Wipe old dummy data
TRUNCATE TABLE tours CASCADE;
TRUNCATE TABLE destinations CASCADE;

-- Insert new real destinations and tours

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Eiffel Tower', 'France')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Eiffel Tower Expedition', 
  'Experience the magic of Paris with a guided tour of the iconic Eiffel Tower and a romantic cruise along the River Seine.', 
  id, 
  120, 
  3, 
  'easy', 
  'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Taj Mahal', 'India')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Taj Mahal Expedition', 
  'Witness the breathtaking beauty of the Taj Mahal at sunrise. A magnificent monument to love and a UNESCO World Heritage site.', 
  id, 
  85, 
  2, 
  'easy', 
  'https://images.unsplash.com/photo-1564507592208-0270e882ce18?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Mount Fuji', 'Japan')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Mount Fuji Expedition', 
  'Challenge yourself with a guided summit trek of Japan''s most sacred mountain, ending with a relaxing stay in a traditional Hakone hot spring.', 
  id, 
  250, 
  5, 
  'hard', 
  'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Bali Beaches', 'Indonesia')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Bali Beaches Expedition', 
  'A tropical paradise escape. Explore hidden waterfalls, ancient temples, and pristine beaches on the Island of the Gods.', 
  id, 
  150, 
  7, 
  'easy', 
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Machu Picchu', 'Peru')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Machu Picchu Expedition', 
  'Hike the historic Inca Trail through the Andes mountains to reach the legendary lost city of Machu Picchu.', 
  id, 
  300, 
  6, 
  'moderate', 
  'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Grand Canyon', 'United States')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Grand Canyon Expedition', 
  'Descend into one of the world''s most spectacular natural wonders. Includes a helicopter tour and guided rim hike.', 
  id, 
  200, 
  4, 
  'moderate', 
  'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Santorini', 'Greece')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Santorini Expedition', 
  'Sail through the caldera, wander through iconic blue-domed villages, and watch the world''s most famous sunset in Oia.', 
  id, 
  180, 
  5, 
  'easy', 
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Banff National Park', 'Canada')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Banff National Park Expedition', 
  'Discover turquoise glacial lakes, towering mountain peaks, and abundant wildlife in the heart of the Canadian Rockies.', 
  id, 
  220, 
  6, 
  'moderate', 
  'https://images.unsplash.com/photo-1513222375924-a13a8ef5b46b?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Swiss Alps', 'Switzerland')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Swiss Alps Expedition', 
  'The ultimate winter adventure. Ski world-class slopes in Zermatt and enjoy luxury alpine lodge accommodations.', 
  id, 
  350, 
  7, 
  'hard', 
  'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;

WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (gen_random_uuid(), 'Serengeti', 'Tanzania')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  gen_random_uuid(), 
  'Serengeti Expedition', 
  'Witness the Great Migration on a premium African safari. Spot lions, elephants, and leopards in their natural habitat.', 
  id, 
  450, 
  8, 
  'moderate', 
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
FROM new_dest;
