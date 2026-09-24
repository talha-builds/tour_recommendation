"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export function WishlistButton({ tourId }: { tourId: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkWishlist() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      
      setUserId(user.id);
      
      const { data } = await supabase
        .from("wishlists")
        .select("*")
        .eq("user_id", user.id)
        .eq("tour_id", tourId)
        .single();
        
      if (data) setIsSaved(true);
      setLoading(false);
    }
    
    checkWishlist();
  }, [tourId, supabase]);

  const toggleWishlist = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    setLoading(true);
    
    if (isSaved) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", userId)
        .eq("tour_id", tourId);
      setIsSaved(false);
    } else {
      await supabase
        .from("wishlists")
        .insert({ user_id: userId, tour_id: tourId });
      setIsSaved(true);
    }
    
    setLoading(false);
    router.refresh(); // Refresh to update any server components if needed
  };

  return (
    <Button 
      variant={isSaved ? "secondary" : "outline"} 
      size="lg" 
      className={`w-full h-14 text-lg rounded-xl gap-2 transition-all ${isSaved ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200' : ''}`}
      onClick={toggleWishlist}
      disabled={loading}
    >
      <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
      {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
    </Button>
  );
}
