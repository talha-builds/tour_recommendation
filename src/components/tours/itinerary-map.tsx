"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom Icons
const planeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/789/789395.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface ItineraryMapProps {
  destinationCoords: [number, number];
  destinationName: string;
}

export default function ItineraryMap({ destinationCoords, destinationName }: ItineraryMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Location blocked, using fallback.");
          // Fallback to Mumbai (Jogeshwari) since browser is blocking
          setUserLocation([19.1363, 72.8489]); 
        },
        { timeout: 3000 }
      );
    } else {
      setUserLocation([19.1363, 72.8489]);
    }
  }, []);

  if (!userLocation) return null; // Wait for location or fallback

  // Simulate Airports (Slightly offset from Home and Destination)
  // In a real production app, you would query an API for the nearest IATA airport coordinates.
  const localAirport: [number, number] = [userLocation[0] + 0.5, userLocation[1] + 0.5];
  const destAirport: [number, number] = [destinationCoords[0] - 0.2, destinationCoords[1] - 0.2];

  // Map Bounds to fit all points
  const bounds = L.latLngBounds([userLocation, localAirport, destAirport, destinationCoords]);

  return (
    <MapContainer 
      bounds={bounds}
      boundsOptions={{ padding: [50, 50] }}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* 1. Home */}
      <Marker position={userLocation} icon={homeIcon}>
        <Popup><strong>1. Home</strong><br />Your starting location</Popup>
      </Marker>

      {/* 2. Local Airport */}
      <Marker position={localAirport} icon={planeIcon}>
        <Popup><strong>2. Local Airport</strong><br />Departure</Popup>
      </Marker>

      {/* 3. Destination Airport */}
      <Marker position={destAirport} icon={planeIcon}>
        <Popup><strong>3. Destination Airport</strong><br />Arrival</Popup>
      </Marker>

      {/* 4. Hotel/Destination */}
      <Marker position={destinationCoords}>
        <Popup><strong>4. Hotel</strong><br />{destinationName}</Popup>
      </Marker>

      {/* Lines between the points */}
      {/* Drive to Airport */}
      <Polyline positions={[userLocation, localAirport]} color="#64748b" weight={4} dashArray="10, 10" />
      
      {/* Flight (Across ocean/land) */}
      <Polyline positions={[localAirport, destAirport]} color="#3b82f6" weight={5} />

      {/* Drive to Hotel */}
      <Polyline positions={[destAirport, destinationCoords]} color="#64748b" weight={4} dashArray="10, 10" />
      
    </MapContainer>
  );
}
