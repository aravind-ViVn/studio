"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Calendar, BookOpen, Star } from "lucide-react"

const mockMembers = [
  { id: "1", name: "Alice Johnson", email: "alice.j@example.com", phone: "(555) 123-4567", joinDate: "Jan 2023", status: "Active", initials: "AJ", color: "gradient-primary", borrows: 12 },
  { id: "2", name: "Robert Smith", email: "r.smith@provider.net", phone: "(555) 987-6543", joinDate: "Mar 2023", status: "Active", initials: "RS", color: "gradient-secondary", borrows: 8 },
  { id: "3", name: "Elena Rodriguez", email: "elena.rod@mail.com", phone: "(555) 246-1357", joinDate: "Jun 2023", status: "Inactive", initials: "ER", color: "bg-orange-500", borrows: 0 },
  { id: "4", name: "David Kim", email: "dkim@university.edu", phone: "(555) 369-1470", joinDate: "Oct 2023", status: "Active", initials: "DK", color: "bg-rose-500", borrows: 15 },
  { id: "5", name: "Sarah Williams", email: "sarah.w@service.org", phone: "(555) 753-9514", joinDate: "Dec 2023", status: "Active", initials: "SW", color: "bg-emerald-500", borrows: 4 },
]

export default function MembersPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Community</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Manage library memberships and active subscribers.</p>
        </div>
        <Button className="gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
          <UserPlus className="w-5 h-5 mr-2" /> REGISTER MEMBER
        </Button>
      </div>

      <div className="relative glass-card p-2 rounded-[28px] max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input 
          placeholder="Search by name, email or ID..." 
          className="pl-14 h-14 bg-transparent border-none text-lg placeholder:text-white/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockMembers.map((member) => (
          <div key={member.id} className="glass-card rounded-[32px] p-6 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[40px] -z-10 group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <Avatar className={cn("w-16 h-16 rounded-[22px] border-4 border-white/5 shadow-2xl transition-transform group-hover:rotate-6", member.color)}>
                  <AvatarFallback className="bg-transparent text-white text-xl font-bold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-white tracking-tight">{member.name}</h3>
                  <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">ID: {member.id}092-B</span>
                </div>
              </div>
              <Badge className={cn(
                "rounded-full px-3 py-1 font-bold text-[10px] tracking-widest uppercase",
                member.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"
              )}>
                {member.status}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-medium text-white/60">
                <div className="p-2 bg-white/5 rounded-lg"><Mail className="w-4 h-4" /></div>
                {member.email}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-white/60">
                <div className="p-2 bg-white/5 rounded-lg"><Phone className="w-4 h-4" /></div>
                {member.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Since</p>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Calendar className="w-3 h-3 text-primary" />
                  {member.joinDate}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Activity</p>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <BookOpen className="w-3 h-3 text-secondary" />
                  {member.borrows} Borrows
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform">
              <Button variant="outline" className="flex-1 rounded-xl bg-white/5 border-white/5 font-bold hover:bg-white/10">VIEW PROFILE</Button>
              <Button variant="outline" className="h-10 w-10 rounded-xl bg-white/5 border-white/5 p-0 hover:bg-white/10">
                <MoreHorizontal className="w-5 h-5 text-white/40" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
