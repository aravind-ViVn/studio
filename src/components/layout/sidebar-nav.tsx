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
  LogOut,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Catalog", href: "/dashboard/books", icon: BookOpen },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight },
  { name: "AI Discovery", href: "/dashboard/discovery", icon: Sparkles },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full glass-sidebar w-72 p-6 animate-fade-in shrink-0">
      <div className="mb-10 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 gradient-primary rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">
              LibraFlow
            </h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Admin OS v4</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300",
                isActive 
                  ? "bg-white/10 text-white shadow-lg shadow-black/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-white/30 group-hover:text-white/60"
                )} />
                {item.name}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-primary animate-in fade-in" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 px-2">
        <div className="p-4 rounded-[24px] bg-white/5 mb-6 flex items-center gap-3 border border-white/5">
          <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center font-bold text-white shadow-lg">
            JD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-sm truncate">Jane Doe</span>
            <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Super Admin</span>
          </div>
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          SIGN OUT
        </Link>
      </div>
    </div>
  )
}
