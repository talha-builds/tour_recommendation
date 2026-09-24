"use client";

import { useEffect, useState } from "react";
import { Plane, Car, MapPin, Loader2 } from "lucide-react";
import { ItineraryMapWrapper } from "@/components/tours/itinerary-map-wrapper";

interface BookingDashboardProps {
  destinationCoords: [number, number];
  destinationName: string;
}

export function BookingDashboard({ destinationCoords, destinationName }: BookingDashboardProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [userCity, setUserCity] = useState("Your Location");
  const [localAirportName, setLocalAirportName] = useState("Local Airport");
  const [destAirportName, setDestAirportName] = useState("Destination Airport");
  const [loading, setLoading] = useState(true);
  const [isRoadTrip, setIsRoadTrip] = useState(false);

  useEffect(() => {
    // Hardcoding public key here to bypass Next.js client-side caching issue during hot reload
    const apiKey = "1d8f93747b2f437e99a297baab9b84fa";
    
    if (navigator.geolocation && apiKey) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setUserLocation([lat, lon]);

          try {
            // 1. Reverse Geocode User Location to get City/Neighborhood
            const reverseRes = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`);
            const reverseData = await reverseRes.json();
            if (reverseData.features?.length > 0) {
              const props = reverseData.features[0].properties;
              setUserCity(props.suburb || props.city || props.name || "Your Location");
            }

            // Calculate direct distance to see if we need a flight
            // Rough distance using pythagoras (not perfectly accurate for globe, but good enough for a quick threshold check)
            const R = 6371; // Earth radius in km
            const dLat = (destinationCoords[0] - lat) * (Math.PI/180);
            const dLon = (destinationCoords[1] - lon) * (Math.PI/180);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat * (Math.PI/180)) * Math.cos(destinationCoords[0] * (Math.PI/180)) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const distance = R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));

            if (distance < 500) {
              // Less than 500km is a road trip! No flights needed.
              setIsRoadTrip(true);
            } else {
              // 2. Find nearest airport to User
              const userAirportRes = await fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=circle:${lon},${lat},50000&limit=1&apiKey=${apiKey}`);
              const userAirportData = await userAirportRes.json();
              if (userAirportData.features?.length > 0) {
                setLocalAirportName(userAirportData.features[0].properties.name || "Local Airport");
              }

              // 3. Find nearest airport to Destination
              const destAirportRes = await fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=circle:${destinationCoords[1]},${destinationCoords[0]},50000&limit=1&apiKey=${apiKey}`);
              const destAirportData = await destAirportRes.json();
              if (destAirportData.features?.length > 0) {
                setDestAirportName(destAirportData.features[0].properties.name || "Destination Airport");
              }
            }
          } catch (e) {
            console.error("Failed to fetch rich location data", e);
          }
          
          setLoading(false);
        },
        async (error) => {
          console.warn("Browser Location blocked/failed. Using IP Geolocation fallback.");
          try {
            // Fallback to IP Geolocation if browser blocks it (common on desktop)
            const ipRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
            const ipData = await ipRes.json();
            const lat = parseFloat(ipData.latitude);
            const lon = parseFloat(ipData.longitude);
            
            setUserLocation([lat, lon]);
            setUserCity(ipData.city || "Mumbai");

            // 2. Find nearest airport to User
            const userAirportRes = await fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=circle:${lon},${lat},50000&limit=1&apiKey=${apiKey}`);
            const userAirportData = await userAirportRes.json();
            if (userAirportData.features?.length > 0) {
              setLocalAirportName(userAirportData.features[0].properties.name || "Local Airport");
            }

            // 3. Find nearest airport to Destination
            const destAirportRes = await fetch(`https://api.geoapify.com/v2/places?categories=airport&filter=circle:${destinationCoords[1]},${destinationCoords[0]},50000&limit=1&apiKey=${apiKey}`);
            const destAirportData = await destAirportRes.json();
            if (destAirportData.features?.length > 0) {
              setDestAirportName(destAirportData.features[0].properties.name || "Destination Airport");
            }
          } catch (e) {
            console.error("Fallback failed", e);
            setUserLocation([19.1363, 72.8489]); // Hard fallback to Jogeshwari, Mumbai
            setUserCity("Jogeshwari");
          }
          setLoading(false);
        },
        { timeout: 3000 }
      );
    } else {
      setLoading(false);
    }
  }, [destinationCoords]);

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Analyzing routes and generating dynamic itinerary...</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Timeline UI */}
      <div className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-sm border">
        <h2 className="text-xl font-bold mb-8">Your Dynamic Journey</h2>
        
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          {/* Step 1: Start */}
          <div className="relative flex items-start gap-6">
            <div className="absolute left-0 w-10 h-10 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center z-10">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-14">
              <h3 className="font-bold text-slate-800">Start from {userCity}</h3>
              <p className="text-sm text-muted-foreground mt-1">Your journey begins at your current location.</p>
            </div>
          </div>

          {!isRoadTrip ? (
            <>
              {/* Step 2: Local Airport */}
              <div className="relative flex items-start gap-6">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <Car className="h-5 w-5 text-slate-600" />
                </div>
                <div className="ml-14">
                  <h3 className="font-bold text-slate-800">Drive to {localAirportName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Head to the nearest international departure gate.</p>
                </div>
              </div>

              {/* Step 3: Flight */}
              <div className="relative flex items-start gap-6">
                <div className="absolute left-0 w-10 h-10 rounded-full bg-primary/20 border-4 border-white flex items-center justify-center z-10">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-14">
                  <h3 className="font-bold text-slate-800">Fly to {destAirportName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Direct transit to your destination region.</p>
                </div>
              </div>
            </>
          ) : (
            /* Roadtrip Alternative */
            <div className="relative flex items-start gap-6">
              <div className="absolute left-0 w-10 h-10 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center z-10">
                <Car className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-14">
                <h3 className="font-bold text-slate-800">Road Trip!</h3>
                <p className="text-sm text-muted-foreground mt-1">This destination is close enough for a scenic drive.</p>
              </div>
            </div>
          )}

          {/* Step 4: Final Hotel */}
          <div className="relative flex items-start gap-6">
            <div className="absolute left-0 w-10 h-10 rounded-full bg-green-100 border-4 border-white flex items-center justify-center z-10">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-14">
              <h3 className="font-bold text-slate-800">Arrive at Hotel in {destinationName}</h3>
              <p className="text-sm text-muted-foreground mt-1">Final transit to your accommodation.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Map */}
      <div className="lg:col-span-2">
        <ItineraryMapWrapper destinationCoords={destinationCoords} destinationName={destinationName} />
      </div>
    </div>
  );
}
