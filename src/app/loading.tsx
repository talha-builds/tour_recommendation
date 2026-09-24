import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 max-w-2xl mx-auto text-center">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-full max-w-md mx-auto" />
      </div>
      
      <div className="h-24 max-w-4xl mx-auto">
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 max-w-4xl mx-auto">
        <Skeleton className="aspect-video rounded-2xl" />
        <Skeleton className="aspect-video rounded-2xl" />
      </div>
    </div>
  );
}
