"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ArrowLeftRight, 
  FileText, 
  Sparkles,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Catalog", href: "/dashboard/books", icon: BookOpen },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { name: "AI Discovery", href: "/dashboard/discovery", icon: Sparkles },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground w-64 border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-2xl font-headline font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-secondary" />
          LibraFlow
        </h2>
        <p className="text-xs text-sidebar-foreground/60 mt-1 uppercase tracking-widest font-medium">Archive Management</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-white" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-secondary" : "text-sidebar-foreground/40")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-sidebar-foreground/70 mb-4">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center font-bold text-secondary">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-white font-medium">Admin User</span>
            <span className="text-[10px] uppercase">Librarian</span>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}