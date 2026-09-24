const apiKey = "1d8f93747b2f437e99a297baab9b84fa";
const lat = 19.1363; // Mumbai, Jogeshwari approx
const lon = 72.8489;

async function test() {
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log("Reverse Geocode:", JSON.stringify(data, null, 2));

    const res2 = await fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=circle:${lon},${lat},50000&limit=1&apiKey=${apiKey}`);
    const data2 = await res2.json();
    console.log("Places Airport:", JSON.stringify(data2, null, 2));
  } catch (e) {
    console.error(e);
  }
}
test();
