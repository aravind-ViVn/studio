"use client"

import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserProfileDropdown() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 flex items-center gap-3 px-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
          <Avatar className="h-8 w-8 rounded-xl border border-white/10">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-xs font-bold text-white leading-none">{user.name}</span>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">{user.role}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 glass-card border-white/10 rounded-2xl p-2 shadow-2xl">
        <DropdownMenuLabel className="p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-white">{user.name}</p>
            <p className="text-xs text-white/40 font-medium">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem 
          onClick={() => router.push('/dashboard/settings?tab=identity')}
          className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center gap-3"
        >
          <User className="w-4 h-4 text-primary" /> My Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push('/dashboard/settings')}
          className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center gap-3"
        >
          <Settings className="w-4 h-4 text-secondary" /> Account Settings
        </DropdownMenuItem>
        {user.role === 'Super Admin' && (
          <DropdownMenuItem 
            onClick={() => router.push('/dashboard/users')}
            className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center gap-3"
          >
            <Shield className="w-4 h-4 text-accent" /> User Management
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem 
          onClick={logout}
          className="rounded-xl p-3 font-bold text-rose-400 hover:bg-rose-400/10 cursor-pointer flex items-center gap-3"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
