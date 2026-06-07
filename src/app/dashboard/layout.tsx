import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LibraProvider } from "@/context/libra-context";
import { Toaster } from "@/components/ui/toaster";
import { NotificationCenter } from "@/components/layout/notification-center";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LibraProvider>
      <div className="flex h-screen bg-[#0F172A] overflow-hidden">
        <SidebarNav />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
          
          {/* Top Bar for Notifications */}
          <div className="h-20 px-10 flex items-center justify-end sticky top-0 z-40 bg-background/20 backdrop-blur-md border-b border-white/5">
            <NotificationCenter />
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
