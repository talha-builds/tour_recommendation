"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicItineraryMap = dynamic(
  () => import("./itinerary-map"),
  { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-full min-h-[500px] rounded-xl" />
  }
);

interface ItineraryMapWrapperProps {
  destinationCoords: [number, number];
  destinationName: string;
}

export function ItineraryMapWrapper({ destinationCoords, destinationName }: ItineraryMapWrapperProps) {
  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border shadow-sm relative z-0">
      <DynamicItineraryMap destinationCoords={destinationCoords} destinationName={destinationName} />
    </div>
  );
}
