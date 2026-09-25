import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("tours")
      .select("*", { count: "exact", head: true });
    
    return NextResponse.json({ 
      status: "ok", 
      tours: count,
      pinged_at: new Date().toISOString() 
    });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
