import { createClient } from "@/lib/supabase/server";
import { calculateRecommendations } from "@/lib/recommendations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Settings } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null; // Middleware will redirect

  // Fetch user profile and preferences
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: prefs } = await supabase.from("user_preferences").select("*").eq("user_id", user.id).single();

  // Fetch all tours
  const { data: tours } = await supabase.from("tours").select("*, destinations(country)");

  // Fetch wishlist
  const { data: wishlistData } = await supabase
    .from("wishlists")
    .select("tour_id")
    .eq("user_id", user.id);
  
  const wishlistIds = wishlistData?.map(w => w.tour_id) || [];
  const wishlistedTours = tours?.filter(t => wishlistIds.includes(t.id)) || [];

  // Run Recommendation Engine
  const recommendedTours = calculateRecommendations(tours || [], prefs);

  // Take top 3 for the dashboard
  const topMatches = recommendedTours.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!</h1>
          <p className="text-muted-foreground mt-1">Here is your personalized travel dashboard.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {profile?.role === 'admin' && (
            <Link href="/admin/manage">
              <Button className="gap-2 w-full sm:w-auto">
                Admin Panel
              </Button>
            </Link>
          )}
          <Link href="/admin/preferences">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Settings className="h-4 w-4" />
              Update Preferences
            </Button>
          </Link>
        </div>
      </div>

      {!prefs && (
        <Card className="bg-primary/5 border-primary/20 shadow-sm mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Complete your profile</h3>
            <p className="text-muted-foreground mb-4">You haven&apos;t set up your travel preferences yet. Take the questionnaire to get personalized recommendations!</p>
            <Link href="/admin/preferences">
              <Button>Take Questionnaire</Button>
            </Link>
          </CardContent>
        </Card>
      )}{prefs && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Top Matches</h2>
            <div className="hidden sm:flex gap-2">
              <Badge variant="secondary" className="uppercase">{prefs.preferred_budget}</Badge>
              <Badge variant="secondary" className="uppercase">{prefs.preferred_difficulty}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-white shadow-md h-full flex flex-col relative">
                  
                  {/* Match Score Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-green-500 hover:bg-green-600 border-0 shadow-md">
                      {tour.matchScore >= 10 ? 'Perfect Match' : tour.matchScore >= 5 ? 'Great Match' : 'Good Match'}
                    </Badge>
                  </div>

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
                  </div>
                  <CardHeader className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase">
                        {tour.difficulty}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{tour.duration_days} Days</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-1">{tour.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {tour.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4 border-t border-border/50 shrink-0">
                    <div className="text-lg font-bold">${tour.price}</div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
            {topMatches.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-xl border border-dashed">
                No tours currently match your highly specific preferences.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Wishlist Section */}
      <section className="space-y-6 pt-8 border-t border-border/50">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedTours.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.id}`}>
              <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-white shadow-md h-full flex flex-col relative">
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
                </div>
                <CardHeader className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase">
                      {tour.difficulty}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">{tour.duration_days} Days</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-1">{tour.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {tour.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t border-border/50 shrink-0">
                  <div className="text-lg font-bold">${tour.price}</div>
                </CardFooter>
              </Card>
            </Link>
          ))}
          {wishlistedTours.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-xl border border-dashed">
              You haven&apos;t saved any tours to your wishlist yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
