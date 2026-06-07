import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">
      <SidebarNav />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Background Gradients for Dashboard Content */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
