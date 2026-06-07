"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ArrowLeftRight, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight,
  Search,
  ShieldAlert
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["Super Admin", "Librarian"] },
  { name: "Catalog", href: "/dashboard/books", icon: BookOpen, roles: ["Super Admin", "Librarian"] },
  { name: "Members", href: "/dashboard/members", icon: Users, roles: ["Super Admin", "Librarian"] },
  { name: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight, roles: ["Super Admin", "Librarian"] },
  { name: "Analytics & Reports", href: "/dashboard/reports", icon: BarChart3, roles: ["Super Admin"] },
  { name: "User Management", href: "/dashboard/users", icon: ShieldAlert, roles: ["Super Admin"] },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["Super Admin"] },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  const filteredItems = NAV_ITEMS.filter(item => user && item.roles.includes(user.role))
  const userInitials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || "JD"

  return (
    <div className="flex flex-col h-full glass-sidebar w-72 p-6 animate-fade-in shrink-0">
      <div className="mb-8 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 gradient-primary rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">
              LibraFlow
            </h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold font-headline">LMS PROTOCOL</p>
          </div>
        </div>
      </div>

      <div className="px-2 mb-6 font-body">
        <form onSubmit={handleSearch} className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Catalog Search..." 
            className="h-11 pl-10 bg-white/5 border-white/5 rounded-xl text-xs font-bold text-white focus:border-primary/50 font-headline"
          />
        </form>
      </div>

      <nav className="flex-1 space-y-2 px-2 overflow-y-auto no-scrollbar font-headline">
        {filteredItems.map((item) => {
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

      <div className="mt-auto pt-6 border-t border-white/5 px-2 font-body">
        <div className="p-4 rounded-[24px] bg-white/5 mb-6 flex items-center gap-3 border border-white/5">
          <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center font-bold text-white shadow-lg font-headline">
            {userInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-sm truncate">{user?.name}</span>
            <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider font-headline">{user?.role}</span>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all duration-300 group font-headline"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          SIGN OUT
        </button>
      </div>
    </div>
  )
}
