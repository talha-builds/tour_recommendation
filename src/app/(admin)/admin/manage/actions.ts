"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTour(tourId: string) {
  const supabase = await createClient();
  
  // Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Unauthorized");

  // Delete
  const { error } = await supabase.from("tours").delete().eq("id", tourId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage");
  revalidatePath("/tours");
  revalidatePath("/");
}

export async function createTour(formData: FormData) {
  const supabase = await createClient();
  
  // Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Unauthorized");

  // Extract form data
  const title = formData.get("title") as string;
  const destination_id = formData.get("destination_id") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const duration_days = parseInt(formData.get("duration_days") as string, 10);
  const difficulty = formData.get("difficulty") as string;
  const is_featured = formData.get("is_featured") === "on";
  
  // Basic validation
  if (!title || !destination_id || !price || !duration_days || !difficulty) {
    throw new Error("Missing required fields");
  }

  const { error } = await supabase.from("tours").insert({
    title,
    destination_id,
    description,
    price,
    duration_days,
    difficulty,
    is_featured,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/manage");
  revalidatePath("/tours");
  revalidatePath("/");
}
