import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

export const metadata = {
  title: "Tours | Wanderlust",
};

export default async function ToursPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase.from("tours").select("*, destinations(country)").order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">All Tours</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our complete catalog of unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {tours?.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.id}`}>
              <Card className="hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-white shadow-md h-full flex flex-col">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden shrink-0">
                  {tour.image_url ? (
                    <Image 
                      src={tour.image_url}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <MapPin className="h-12 w-12 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-sm">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" /> 4.9
                  </div>
                </div>
                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase">
                      {tour.difficulty}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">{tour.duration_days} Days</span>
                  </div>
                  <CardTitle className="text-2xl line-clamp-1">{tour.title}</CardTitle>
                  <CardDescription className="flex items-center text-base mt-2">
                    <MapPin className="h-4 w-4 mr-1 text-primary" /> {tour.destinations?.country || 'Unknown Location'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-2">
                    {tour.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t border-border/50 shrink-0">
                  <div className="text-xl font-bold">${tour.price} <span className="text-sm text-muted-foreground font-normal">/ person</span></div>
                </CardFooter>
              </Card>
            </Link>
          ))}
          {tours?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No tours found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
