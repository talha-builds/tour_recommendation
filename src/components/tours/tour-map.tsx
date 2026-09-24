"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

// Fix for default marker icons in Next.js/Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface TourMapProps {
  destinationCoords: [number, number]; // [lat, lng]
  destinationName: string;
}

// Sub-component to handle routing logic inside the map context
function RoutingMachine({ start, end }: { start: [number, number]; end: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "#3b82f6", weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: true, // show instructions panel
      // @ts-ignore - type definitions are missing createMarker
      createMarker: () => null // don't create default waypoints markers, we handle them
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, start, end]);

  return null;
}

export default function TourMap({ destinationCoords, destinationName }: TourMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Location not available (or blocked). Showing destination only.");
        },
        { timeout: 5000 } // Fail fast after 5 seconds if blocked
      );
    }
  }, []);

  // Always center on destination initially
  const center = destinationCoords;

  return (
    <MapContainer 
      center={center} 
      zoom={userLocation ? 5 : 13} 
      style={{ height: "100%", width: "100%", borderRadius: "0.75rem", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Destination Marker */}
      <Marker position={destinationCoords}>
        <Popup>
          <strong>{destinationName}</strong><br />Your Destination
        </Popup>
      </Marker>

      {/* User Location Marker (if available) */}
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>
            <strong>Your Location</strong><br />Starting point
          </Popup>
        </Marker>
      )}

      {/* Draw route if we have both locations */}
      {userLocation && <RoutingMachine start={userLocation} end={destinationCoords} />}
    </MapContainer>
  );
}
