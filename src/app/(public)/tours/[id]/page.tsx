import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, Mountain, DollarSign, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/tours/wishlist-button";
import { MapWrapper } from "@/components/tours/map-wrapper";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: tour } = await supabase.from("tours").select("title").eq("id", id).single();
  return { title: tour ? `${tour.title} | Wanderlust` : "Tour Not Found" };
}

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: tour, error } = await supabase
    .from("tours")
    .select("*, destinations(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase Error fetching tour details:", error);
  }

  if (!tour) {
    notFound();
  }

  // Geocode destination to get coordinates for the map using Geoapify
  let coords: [number, number] | null = null;
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  if (apiKey && tour.destinations) {
    try {
      const query = encodeURIComponent(`${tour.destinations.name}, ${tour.destinations.country}`);
      const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${query}&apiKey=${apiKey}`);
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        // Geoapify returns [lon, lat] but Leaflet uses [lat, lon]
        const [lon, lat] = data.features[0].geometry.coordinates;
        coords = [lat, lon];
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
  }

  // Fallback to a default coordinate (e.g. Center of the world or London) if geocoding fails
  const destinationCoords = coords || [51.5074, -0.1278];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {tour.image_url ? (
          <Image 
            src={tour.image_url}
            alt={tour.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <MapPin className="h-20 w-20 text-slate-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-6xl">
            <Badge className="mb-4 bg-primary text-primary-foreground border-0 text-sm px-3 py-1 uppercase tracking-wider">
              {tour.difficulty}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{tour.destinations?.name}, {tour.destinations?.country}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
                <span className="text-lg">4.9 (128 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Details */}
          <div className="lg:w-2/3 space-y-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">About this tour</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {tour.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
              <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-bold text-lg">{tour.duration_days} Days</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl">
                <Mountain className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Difficulty</span>
                <span className="font-bold text-lg capitalize">{tour.difficulty}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-bold text-lg">${tour.price}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Availability</span>
                <span className="font-bold text-lg">Year Round</span>
              </div>
            </div>

            {/* Map Section */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold mb-6">Location & Routing</h3>
              <p className="text-muted-foreground mb-4">
                The map below shows your destination. If you allow location access, it will automatically generate a dynamic route from your current location directly to the tour starting point!
              </p>
              <MapWrapper 
                destinationCoords={destinationCoords as [number, number]} 
                destinationName={`${tour.destinations?.name}, ${tour.destinations?.country}`} 
              />
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 bg-white rounded-3xl p-8 shadow-xl border border-border/50">
              <div className="text-3xl font-bold mb-2">
                ${tour.price} <span className="text-base font-normal text-muted-foreground">/ person</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                4.9 (128 reviews)
              </div>
              
              <div className="space-y-4">
                <Link href={`/tours/${tour.id}/book`} className="w-full block">
                  <Button size="lg" className="w-full h-14 text-lg rounded-xl">
                    Book Now
                  </Button>
                </Link>
                <WishlistButton tourId={tour.id} />
              </div>

              <div className="mt-6 pt-6 border-t border-border text-sm text-center text-muted-foreground">
                <p>Free cancellation up to 7 days before departure.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
