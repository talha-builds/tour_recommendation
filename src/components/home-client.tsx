"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Database } from "@/types/supabase";

type Tour = Database["public"]["Tables"]["tours"]["Row"] & {
  destinations?: { country: string } | null;
};

export function HomeClient({ featuredTours }: { featuredTours: Tour[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (budget) params.set("budget", budget);
    router.push(`/tours${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <main className="min-h-screen bg-background font-[family-name:var(--font-sans)]">
      
      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Beautiful mountain lake at sunrise"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 pt-16 sm:pt-20 flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-4xl"
          >
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md px-4 py-1.5 text-sm mb-4">
              Premium Travel Experiences
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
              Discover Your <br/> Next Adventure
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md px-2">
              Curated tours and personalized recommendations for the modern traveler. Explore the world's most breathtaking destinations.
            </p>
          </motion.div>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-3xl mt-8 sm:mt-12 px-2 sm:px-0"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full p-3 flex flex-col sm:flex-row gap-2 shadow-2xl shadow-black/20 border border-white/40">
              <div className="flex-1 relative flex items-center px-3 sm:pl-4">
                <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
                <Input 
                  placeholder="Where to? (e.g. Japan, Safari, Bali...)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="border-0 bg-transparent text-base sm:text-lg shadow-none focus-visible:ring-0 px-0 h-10 sm:h-12" 
                />
              </div>
              <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-border/50 pt-2 sm:pt-0 sm:pl-2">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-10 sm:h-12 bg-transparent text-sm sm:text-base focus:outline-none px-2"
                >
                  <option value="">Any Budget</option>
                  <option value="15000">Under ₹15,000</option>
                  <option value="25000">Under ₹25,000</option>
                  <option value="40000">Under ₹40,000</option>
                </select>
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                className="h-11 sm:h-14 rounded-xl sm:rounded-full px-6 sm:px-8 text-base sm:text-lg w-full sm:w-auto shrink-0 shadow-lg shadow-primary/20"
              >
                Explore Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-12 sm:py-24 container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Your Next Great Adventure Awaits</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We&apos;ve curated the most breathtaking experiences across the globe. Whether you&apos;re looking to scale the highest peaks, dive into crystal clear waters, or wander through ancient ruins, we have the perfect journey for you.
            </p>
          </div>
          <Link href="/tours">
            <Button variant="ghost" className="mt-4 md:mt-0 group hidden md:flex">
              View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {featuredTours.length > 0 ? (
            featuredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/tours/${tour.id}`}>
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
                      <div className="text-xl font-bold">₹{tour.price.toLocaleString('en-IN')} <span className="text-sm text-muted-foreground font-normal">/ person</span></div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No featured tours found. Did you run the seed script?
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/tours">
            <Button variant="outline" className="w-full">
              View All Tours
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
