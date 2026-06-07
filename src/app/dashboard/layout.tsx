"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LibraProvider } from "@/context/libra-context";
import { Toaster } from "@/components/ui/toaster";
import { NotificationCenter } from "@/components/layout/notification-center";
import { useAuth } from "@/context/auth-context";
import { UserProfileDropdown } from "@/components/layout/user-profile-dropdown";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

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
      <div className="flex h-screen bg-[#0F172A] overflow-hidden">
        <SidebarNav />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          <div className="h-20 px-10 flex items-center justify-end sticky top-0 z-40 bg-background/20 backdrop-blur-md border-b border-white/5 gap-4">
            <NotificationCenter />
            <div className="h-8 w-px bg-white/10 mx-2" />
            <UserProfileDropdown />
          </div>

          <div className="p-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </LibraProvider>
  );
}
