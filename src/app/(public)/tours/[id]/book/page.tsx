import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { BookingDashboard } from "@/components/tours/booking-dashboard";

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
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h1>
          </div>
          <p className="text-muted-foreground text-lg ml-11">
            You are officially going to {tour.destinations?.name}. Here is your dynamic travel itinerary.
          </p>
        </div>

        <BookingDashboard destinationCoords={coords} destinationName={tour.title} />
      </div>
    </main>
  );
}
