const fs = require('fs');

// Real world data
const places = [
  { name: "Eiffel Tower", country: "France", lat: 48.8584, lon: 2.2945, price: 120, days: 3, diff: "easy", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80", desc: "Experience the magic of Paris with a guided tour of the iconic Eiffel Tower and a romantic cruise along the River Seine." },
  { name: "Taj Mahal", country: "India", lat: 27.1751, lon: 78.0421, price: 85, days: 2, diff: "easy", img: "https://images.unsplash.com/photo-1564507592208-0270e882ce18?auto=format&fit=crop&w=1000&q=80", desc: "Witness the breathtaking beauty of the Taj Mahal at sunrise. A magnificent monument to love and a UNESCO World Heritage site." },
  { name: "Mount Fuji", country: "Japan", lat: 35.3606, lon: 138.7274, price: 250, days: 5, diff: "hard", img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1000&q=80", desc: "Challenge yourself with a guided summit trek of Japan's most sacred mountain, ending with a relaxing stay in a traditional Hakone hot spring." },
  { name: "Bali Beaches", country: "Indonesia", lat: -8.4095, lon: 115.1889, price: 150, days: 7, diff: "easy", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80", desc: "A tropical paradise escape. Explore hidden waterfalls, ancient temples, and pristine beaches on the Island of the Gods." },
  { name: "Machu Picchu", country: "Peru", lat: -13.1631, lon: -72.5450, price: 300, days: 6, diff: "moderate", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=80", desc: "Hike the historic Inca Trail through the Andes mountains to reach the legendary lost city of Machu Picchu." },
  { name: "Grand Canyon", country: "United States", lat: 36.1069, lon: -112.1129, price: 200, days: 4, diff: "moderate", img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1000&q=80", desc: "Descend into one of the world's most spectacular natural wonders. Includes a helicopter tour and guided rim hike." },
  { name: "Santorini", country: "Greece", lat: 36.3932, lon: 25.4615, price: 180, days: 5, diff: "easy", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80", desc: "Sail through the caldera, wander through iconic blue-domed villages, and watch the world's most famous sunset in Oia." },
  { name: "Banff National Park", country: "Canada", lat: 51.1784, lon: -115.5708, price: 220, days: 6, diff: "moderate", img: "https://images.unsplash.com/photo-1513222375924-a13a8ef5b46b?auto=format&fit=crop&w=1000&q=80", desc: "Discover turquoise glacial lakes, towering mountain peaks, and abundant wildlife in the heart of the Canadian Rockies." },
  { name: "Swiss Alps", country: "Switzerland", lat: 46.5595, lon: 8.5583, price: 350, days: 7, diff: "hard", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80", desc: "The ultimate winter adventure. Ski world-class slopes in Zermatt and enjoy luxury alpine lodge accommodations." },
  { name: "Serengeti", country: "Tanzania", lat: -2.3333, lon: 34.8333, price: 450, days: 8, diff: "moderate", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80", desc: "Witness the Great Migration on a premium African safari. Spot lions, elephants, and leopards in their natural habitat." }
];

let sql = `
-- Wipe old dummy data
TRUNCATE TABLE tours CASCADE;
TRUNCATE TABLE destinations CASCADE;

-- Insert new real destinations and tours
`;

places.forEach((p, index) => {
  const destId = `gen_random_uuid()`;
  const tourId = `gen_random_uuid()`;
  
  // Clean description for SQL
  const safeDesc = p.desc.replace(/'/g, "''");

  sql += `
WITH new_dest AS (
  INSERT INTO destinations (id, name, country) 
  VALUES (${destId}, '${p.name}', '${p.country}')
  RETURNING id
)
INSERT INTO tours (id, title, description, destination_id, price, duration_days, difficulty, image_url)
SELECT 
  ${tourId}, 
  '${p.name} Expedition', 
  '${safeDesc}', 
  id, 
  ${p.price}, 
  ${p.days}, 
  '${p.diff}', 
  '${p.img}'
FROM new_dest;
`;
});

fs.writeFileSync('real_data.sql', sql);
console.log("real_data.sql generated successfully!");
