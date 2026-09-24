-- INSERT DUMMY DESTINATIONS
INSERT INTO public.destinations (id, name, country, description, image_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Kyoto', 'Japan', 'The cultural heart of Japan, featuring ancient temples, traditional tea houses, and vibrant bamboo forests.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop'),
  ('22222222-2222-2222-2222-222222222222', 'Zermatt', 'Switzerland', 'A beautiful mountain resort renowned for skiing, climbing and hiking, lying below the iconic, pyramid-shaped Matterhorn peak.', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop'),
  ('33333333-3333-3333-3333-333333333333', 'Amalfi Coast', 'Italy', 'A stunning stretch of coastline along the southern edge of Italy''s Sorrentine Peninsula, famous for its rugged terrain, scenic beauty, picturesque towns and diversity.', 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2075&auto=format&fit=crop');

-- INSERT DUMMY TOURS
INSERT INTO public.tours (destination_id, title, description, price, duration_days, difficulty, is_featured, image_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Kyoto Temples & Gardens Retreat', 'Experience the serene beauty of ancient Japan. Walk through vibrant autumn maple forests and stay in a traditional ryokan.', 1200, 7, 'easy', true, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop'),
  ('22222222-2222-2222-2222-222222222222', 'Swiss Alps Winter Adventure', 'Breathtaking mountain views, premium ski resorts, and cozy chalets. Perfect for winter sports enthusiasts and relaxation.', 2400, 5, 'moderate', true, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop'),
  ('33333333-3333-3333-3333-333333333333', 'Mediterranean Coastal Getaway', 'Sail along the stunning Italian coastline, explore colorful cliffside villages, and indulge in authentic Mediterranean cuisine.', 3100, 10, 'easy', true, 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2075&auto=format&fit=crop'),
  ('11111111-1111-1111-1111-111111111111', 'Mt. Fuji & Hakone Tour', 'Take a bullet train to Hakone, enjoy a hot spring bath, and witness the majestic Mt. Fuji.', 800, 3, 'moderate', false, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop');
