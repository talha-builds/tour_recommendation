"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
      <div className="glass p-12 rounded-3xl max-w-md w-full space-y-6 shadow-xl border-red-500/20">
        <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-slate-800 mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground mb-8">
          We apologize, but we couldn&apos;t load this page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => reset()} 
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCcw className="h-4 w-4" /> Try again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()} 
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <Home className="h-4 w-4" /> Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
