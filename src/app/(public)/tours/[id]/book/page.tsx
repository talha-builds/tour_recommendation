import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { BookingFlow } from "./booking-flow";

export default async function BookingItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: tour } = await supabase
    .from("tours")
    .select("*, destinations(*)")
    .eq("id", id)
    .single();

  if (!tour) {
    notFound();
  }

  // Geocode destination for the map
  let coords: [number, number] = [51.5074, -0.1278]; // Default fallback
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  if (apiKey && tour.destinations) {
    try {
      const query = encodeURIComponent(`${tour.destinations.name}, ${tour.destinations.country}`);
      const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${query}&apiKey=${apiKey}`);
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        coords = [lat, lon];
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
  }

  return (
    <BookingFlow 
      destinationCoords={coords} 
      destinationName={tour.title}
      tourName={tour.title}
    />
  );
}
