"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";

type Tour = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_days: number;
  difficulty: string;
  image_url: string | null;
  destinations?: { country: string; name: string } | null;
};

export function ToursClient({ tours }: { tours: Tour[] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [difficulty, setDifficulty] = useState("");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("budget") || "");

  const filtered = useMemo(() => {
    return tours.filter((tour) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        tour.title.toLowerCase().includes(q) ||
        (tour.destinations?.country || "").toLowerCase().includes(q) ||
        (tour.destinations?.name || "").toLowerCase().includes(q) ||
        (tour.description || "").toLowerCase().includes(q);

      const matchesDifficulty = !difficulty || tour.difficulty === difficulty;
      const matchesPrice = !maxPrice || tour.price <= Number(maxPrice);

      return matchesSearch && matchesDifficulty && matchesPrice;
    });
  }, [tours, search, difficulty, maxPrice]);

  const hasFilters = search || difficulty || maxPrice;

  const clearFilters = () => {
    setSearch("");
    setDifficulty("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            All Tours
          </h1>
          <p className="text-muted-foreground text-lg">
            {filtered.length} experience{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-border/40 p-4 mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by destination, country or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 border-0 bg-slate-50 rounded-xl focus-visible:ring-1"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="h-11 px-3 rounded-xl bg-slate-50 border border-input text-sm w-full sm:w-36 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">Any Level</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="relative w-full sm:w-40">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
            <Input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="pl-7 h-11 border-input bg-slate-50 rounded-xl focus-visible:ring-1"
            />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap px-2"
            >
              <X className="h-4 w-4" /> Clear
            </button>
          )}
        </div>

        {/* Tour Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-muted-foreground"
            >
              <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg">No tours match your search.</p>
              <button onClick={clearFilters} className="mt-3 text-primary underline text-sm">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
            >
              {filtered.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/tours/${tour.id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-white shadow-md h-full flex flex-col">
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden shrink-0">
                        {tour.image_url ? (
                          <Image
                            src={tour.image_url}
                            alt={tour.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      <CardHeader className="pt-5 pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase text-xs">
                            {tour.difficulty}
                          </Badge>
                          <span className="text-sm font-medium text-muted-foreground">{tour.duration_days} Days</span>
                        </div>
                        <CardTitle className="text-xl line-clamp-1">{tour.title}</CardTitle>
                        <CardDescription className="flex items-center text-base mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-primary shrink-0" />
                          {tour.destinations?.country || "Unknown Location"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 py-2">
                        <p className="text-muted-foreground line-clamp-2 text-sm">{tour.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-4 border-t border-border/50 shrink-0">
                        <div className="text-xl font-bold">
                          ₹{tour.price.toLocaleString('en-IN')}{" "}
                          <span className="text-sm text-muted-foreground font-normal">/ person</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
