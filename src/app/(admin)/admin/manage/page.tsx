import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { deleteTour } from "./actions";

export const metadata = {
  title: "Admin Management | Wanderlust",
};

export default async function AdminManagePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  
  if (profile?.role !== 'admin') {
    redirect("/admin"); // Kick them out if not admin
  }

  // Fetch all tours
  const { data: tours } = await supabase
    .from("tours")
    .select("*, destinations(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Tours</h1>
          <p className="text-muted-foreground">Add, edit, or remove tours from the catalog.</p>
        </div>
        <Link href="/admin/manage/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add New Tour
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border/50 text-sm">
                <th className="p-4 font-medium text-muted-foreground">Title</th>
                <th className="p-4 font-medium text-muted-foreground">Destination</th>
                <th className="p-4 font-medium text-muted-foreground">Price</th>
                <th className="p-4 font-medium text-muted-foreground">Difficulty</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {tours?.map((tour) => (
                <tr key={tour.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium">{tour.title} {tour.is_featured && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Featured</span>}</td>
                  <td className="p-4">{tour.destinations?.name}</td>
                  <td className="p-4">${tour.price}</td>
                  <td className="p-4 capitalize">{tour.difficulty}</td>
                  <td className="p-4 text-right">
                    <form action={async () => {
                      "use server";
                      await deleteTour(tour.id);
                    }}>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete Tour">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
              {tours?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No tours found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
