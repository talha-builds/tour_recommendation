import { PageTransition } from "@/components/layout/page-transition";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      {/* Minimal Header */}
      <header className="relative z-10 w-full h-20 flex items-center px-8">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <MapPin className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">Wanderlust</span>
        </Link>
      </header>

      <PageTransition>
        <main className="flex-1 flex items-center justify-center relative z-10 w-full pb-20">
          {children}
        </main>
      </PageTransition>
    </div>
  );
}
