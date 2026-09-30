"use client";

import { useState } from "react";
import { CheckCircle2, User, Phone, Mail, FileText } from "lucide-react";
import { BookingDashboard } from "@/components/tours/booking-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BookingFlowProps {
  destinationCoords: [number, number];
  destinationName: string;
  tourName: string;
}

export function BookingFlow({ destinationCoords, destinationName, tourName }: BookingFlowProps) {
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate booking API call
    setTimeout(() => {
      setIsBooked(true);
      setLoading(false);
    }, 1500);
  };

  if (isBooked) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <h1 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h1>
            </div>
            <p className="text-muted-foreground text-lg ml-11">
              You are officially going to {tourName}. Here is your dynamic travel itinerary.
            </p>
          </div>

          <BookingDashboard destinationCoords={destinationCoords} destinationName={destinationName} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-xl">
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-primary p-6 text-primary-foreground">
            <h1 className="text-2xl font-bold mb-2">Book Your Tour</h1>
            <p className="text-primary-foreground/80">
              Please enter your traveler details for the {tourName}
            </p>
          </div>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input required placeholder="Full Name" className="pl-10 h-12 rounded-xl" />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input required type="tel" placeholder="Phone Number" className="pl-10 h-12 rounded-xl" />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input required type="email" placeholder="Email Address" className="pl-10 h-12 rounded-xl" />
                </div>
                
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input required placeholder="Passport Number" className="pl-10 h-12 rounded-xl" />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-xl" disabled={loading}>
                {loading ? "Processing..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
