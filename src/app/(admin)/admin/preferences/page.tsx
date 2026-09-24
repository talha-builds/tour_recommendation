"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PreferencesPage() {
  const [budget, setBudget] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadPrefs() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (data) {
          setBudget(data.preferred_budget || "");
          setDifficulty(data.preferred_difficulty || "");
        }
      }
      setInitialLoad(false);
    }
    loadPrefs();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);

    const { error } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: userId,
        preferred_budget: budget,
        preferred_difficulty: difficulty
      }, { onConflict: "user_id" });

    setLoading(false);
    if (!error) {
      router.push("/admin");
      router.refresh();
    } else {
      console.error(error);
    }
  };

  if (initialLoad) return <div className="p-8">Loading preferences...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Travel Preferences</CardTitle>
          <CardDescription>
            Update your preferences so we can recommend the perfect tours for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Budget</label>
              <Select 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="w-full"
                required
              >
                <option value="" disabled>Select a budget</option>
                <option value="budget">Budget Friendly (&lt;$1500)</option>
                <option value="moderate">Moderate ($1500 - $2500)</option>
                <option value="luxury">Luxury (&gt;$2500)</option>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Difficulty</label>
              <Select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full"
                required
              >
                <option value="" disabled>Select difficulty</option>
                <option value="easy">Easy (Relaxing, scenic)</option>
                <option value="moderate">Moderate (Some walking/hiking)</option>
                <option value="hard">Hard (Physically demanding)</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
