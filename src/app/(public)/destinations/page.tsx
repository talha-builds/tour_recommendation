import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export const metadata = {
  title: "Destinations | Wanderlust",
};

export default async function DestinationsPage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase.from("destinations").select("*").order("name");

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explore Destinations</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover breathtaking locations around the world. Find your perfect getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations?.map((dest) => (
            <Link key={dest.id} href={`/tours?search=${encodeURIComponent(dest.country)}`}>
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group h-full cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  {dest.image_url ? (
                    <Image 
                      src={dest.image_url}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <MapPin className="h-10 w-10 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{dest.name}</h3>
                    <p className="text-white/80">{dest.country}</p>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground line-clamp-2">
                    {dest.description || `Explore beautiful tours in ${dest.name}, ${dest.country}.`}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {destinations?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No destinations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
