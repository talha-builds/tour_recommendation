"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, UserCircle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  const isHomePage = pathname === "/";
  const isSolid = !isHomePage || scrolled || isMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase]);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSolid 
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-3" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
        <Link href="/" className={`flex items-center space-x-2 transition-opacity hover:opacity-80 ${isSolid ? 'text-primary' : 'text-white'}`}>
          <MapPin className="h-7 w-7" />
          <span className="font-bold text-2xl tracking-tight hidden sm:inline-block shadow-black/10 drop-shadow-sm">Wanderlust</span>
        </Link>

        <nav className={`hidden md:flex items-center space-x-8 text-sm font-medium ${isSolid ? 'text-foreground' : 'text-white/90 drop-shadow-sm'}`}>
          <Link href="/destinations" className="transition-colors hover:text-primary">Destinations</Link>
          <Link href="/tours" className="transition-colors hover:text-primary">Tours</Link>
          <Link href="/about" className="transition-colors hover:text-primary">About</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <Link href="/admin">
                <Button variant={isSolid ? "outline" : "secondary"} className={`h-10 gap-2 ${!isSolid && 'bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm'}`}>
                  <UserCircle className="h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className={`h-10 ${!isSolid && 'text-white hover:bg-white/20'}`}>Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className={`h-10 ${!isSolid && 'bg-white text-primary hover:bg-white/90 shadow-lg'}`}>Sign up</Button>
                </Link>
              </>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`md:hidden ${!isSolid && 'text-white hover:bg-white/20'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/destinations" className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-slate-50 transition-colors">Destinations</Link>
              <Link href="/tours" className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-slate-50 transition-colors">Tours</Link>
              <Link href="/about" className="px-4 py-3 text-lg font-medium rounded-lg hover:bg-slate-50 transition-colors">About</Link>
              
              <div className="pt-4 border-t border-border flex flex-col space-y-3">
                {user ? (
                  <Link href="/admin">
                    <Button className="w-full justify-start gap-2 h-12 text-lg">
                      <UserCircle className="h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full h-12 text-lg">Log in</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full h-12 text-lg">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
