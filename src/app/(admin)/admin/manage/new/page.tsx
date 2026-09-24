import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTour } from "../actions";

export const metadata = {
  title: "Create Tour | Admin",
};

export default async function NewTourPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== 'admin') redirect("/admin");

  // Fetch destinations for the select dropdown
  const { data: destinations } = await supabase.from("destinations").select("id, name, country").order("name");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/manage">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Tour</h1>
      </div>

      <Card className="border-0 shadow-lg">
        <form action={async (formData) => {
          "use server";
          await createTour(formData);
          redirect("/admin/manage");
        }}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Tour Title</label>
              <Input id="title" name="title" required placeholder="e.g. Kyoto Autumn Retreat" />
            </div>

            <div className="space-y-2">
              <label htmlFor="destination_id" className="text-sm font-medium">Destination</label>
              <select 
                id="destination_id" 
                name="destination_id" 
                required 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a destination...</option>
                {destinations?.map(d => (
                  <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                <Input id="price" name="price" type="number" step="0.01" required placeholder="e.g. 1500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="duration_days" className="text-sm font-medium">Duration (Days)</label>
                <Input id="duration_days" name="duration_days" type="number" required placeholder="e.g. 7" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
              <select 
                id="difficulty" 
                name="difficulty" 
                required 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select difficulty...</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea 
                id="description" 
                name="description" 
                required 
                rows={4}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the tour..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="is_featured" name="is_featured" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <label htmlFor="is_featured" className="text-sm font-medium">Feature on Homepage</label>
            </div>
            
          </CardContent>
          <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
            <Button type="submit">Create Tour</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
