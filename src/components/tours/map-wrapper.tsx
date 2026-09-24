"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Leaflet makes direct references to the window object.
// We must dynamically import it with SSR disabled to prevent Next.js from throwing errors during server-side rendering.
const DynamicTourMap = dynamic(
  () => import("./tour-map"),
  { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-full min-h-[400px] rounded-xl" />
  }
);

interface MapWrapperProps {
  destinationCoords: [number, number];
  destinationName: string;
}

export function MapWrapper({ destinationCoords, destinationName }: MapWrapperProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border shadow-sm relative z-0">
      <DynamicTourMap destinationCoords={destinationCoords} destinationName={destinationName} />
    </div>
  );
}
