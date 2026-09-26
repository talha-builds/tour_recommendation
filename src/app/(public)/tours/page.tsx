import { createClient } from "@/lib/supabase/server";
import { ToursClient } from "@/components/tours/tours-client";
import { Suspense } from "react";

export const metadata = {
  title: "Tours | Wanderlust",
  description: "Browse our complete catalog of unforgettable travel experiences.",
};

export default async function ToursPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase
    .from("tours")
    .select("*, destinations(name, country)")
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center text-muted-foreground">Loading tours...</div>}>
      <ToursClient tours={tours || []} />
    </Suspense>
  );
}
