import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
      <div className="glass p-12 rounded-3xl max-w-md w-full space-y-6 shadow-xl shadow-black/5 dark:shadow-white/5 animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPinOff className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight">Lost your way?</h2>
        <p className="text-muted-foreground">
          We couldn&apos;t find the destination you&apos;re looking for. It might have been moved or removed.
        </p>
        
        <div className="pt-4 flex justify-center">
          <Link 
            href="/" 
            className="inline-flex h-10 px-8 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium shadow-sm transition-colors w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
