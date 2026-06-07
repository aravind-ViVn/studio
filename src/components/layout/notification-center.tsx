"use client"

import { useState } from "react"
import { Bell, Check, Trash2, Circle } from "lucide-react"
import { useLibra } from "@/context/libra-context"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function NotificationCenter() {
  const { notifications, markNotificationAsRead, clearNotifications } = useLibra()
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
          <Bell className="w-5 h-5 text-white/70" />
          {unreadCount > 0 && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#0F172A] animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 glass-card border-white/10 rounded-[28px] p-0 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Activity Center</h3>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{unreadCount} UNREAD ALERTS</p>
          </div>
          <Button variant="ghost" size="icon" onClick={clearNotifications} className="h-8 w-8 rounded-lg hover:bg-rose-500/10 hover:text-rose-400">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="max-h-[400px] overflow-y-auto py-2">
          {notifications.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-sm font-medium text-white/40 italic">System quiet...</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id} 
                className={cn(
                  "p-5 hover:bg-white/5 transition-colors group relative cursor-pointer",
                  !n.read && "bg-primary/5"
                )}
                onClick={() => markNotificationAsRead(n.id)}
              >
                <div className="flex gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 shrink-0",
                    n.read ? "bg-white/10" : "bg-primary"
                  )} />
                  <div className="space-y-1 pr-8">
                    <p className="text-sm font-bold text-white tracking-tight leading-tight">{n.title}</p>
                    <p className="text-xs text-white/50 font-medium leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-white/20 font-bold uppercase mt-2 tracking-widest">{n.time}</p>
                  </div>
                </div>
                {!n.read && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-5 right-5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      markNotificationAsRead(n.id)
                    }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
        <div className="p-4 bg-white/5 border-t border-white/5">
          <Button variant="ghost" className="w-full text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase">
            VIEW ALL HISTORICAL LOGS
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
