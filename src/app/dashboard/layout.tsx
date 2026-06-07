"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LibraProvider } from "@/context/libra-context";
import { Toaster } from "@/components/ui/toaster";
import { NotificationCenter } from "@/components/layout/notification-center";
import { useAuth } from "@/context/auth-context";
import { UserProfileDropdown } from "@/components/layout/user-profile-dropdown";
import { Loader2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0F172A]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <LibraProvider>
      <div className="flex h-screen bg-[#0F172A] overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 w-72 lg:flex shrink-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <SidebarNav onClose={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          {/* Header */}
          <div className="h-16 lg:h-20 px-4 lg:px-10 flex items-center justify-between lg:justify-end sticky top-0 z-40 bg-background/20 backdrop-blur-md border-b border-white/5 gap-4">
            <div className="flex items-center gap-4 lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-10 w-10 rounded-xl bg-white/5 border border-white/5"
              >
                <Menu className="w-5 h-5 text-white/70" />
              </Button>
              <span className="font-headline font-bold text-white tracking-tight">LibraFlow</span>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <NotificationCenter />
              <div className="h-8 w-px bg-white/10 mx-1 lg:mx-2" />
              <UserProfileDropdown />
            </div>
          </div>

          <div className="p-4 lg:p-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </LibraProvider>
  );
}
