import { createClient } from "@/lib/supabase/server";
import { HomeClient } from "@/components/home-client";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch featured tours and their associated destination country
  const { data: featuredTours, error } = await supabase
    .from("tours")
    .select("*, destinations(country)")
    .eq("is_featured", true)
    .limit(3);

  if (error) {
    console.error("Error fetching featured tours:", error);
  }

  return <HomeClient featuredTours={featuredTours || []} />;
}
