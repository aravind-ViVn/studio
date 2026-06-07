"use client"

import { useState } from "react"
import { useLibra } from "@/context/libra-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Calendar, BookOpen, Trash2, Edit2, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function MembersPage() {
  const { members, addMember, updateMember, deleteMember } = useLibra()
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddNew = () => {
    setEditingMember(null)
    setIsModalOpen(true)
  }

  const handleEdit = (member: any) => {
    setEditingMember(member)
    setIsModalOpen(true)
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active" as const
  })

  // Sync form data when editing changes
  useState(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        email: editingMember.email,
        phone: editingMember.phone,
        status: editingMember.status
      })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMember) {
      updateMember(editingMember.id, formData)
    } else {
      addMember({
        ...formData,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        borrows: 0,
        initials: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        color: ["gradient-primary", "gradient-secondary", "bg-rose-500", "bg-emerald-500", "bg-orange-500"][Math.floor(Math.random() * 5)]
      })
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Community</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Manage library memberships and active subscribers.</p>
        </div>
        <Button onClick={handleAddNew} className="gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
          <UserPlus className="w-5 h-5 mr-2" /> REGISTER MEMBER
        </Button>
      </div>

      <div className="relative glass-card p-2 rounded-[28px] max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input 
          placeholder="Search by name, email or ID..." 
          className="pl-14 h-14 bg-transparent border-none text-lg placeholder:text-white/20 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="glass-card rounded-[32px] p-8 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[40px] -z-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <Avatar className={cn("w-16 h-16 rounded-[22px] border-4 border-white/5 shadow-2xl transition-transform group-hover:rotate-6", member.color)}>
                    <AvatarFallback className="bg-transparent text-white text-xl font-bold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">{member.name}</h3>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">ID: {member.id.substring(0, 5).toUpperCase()}</span>
                  </div>
                </div>
                <Badge className={cn(
                  "rounded-full px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase",
                  member.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-white/30 border border-white/5"
                )}>
                  {member.status}
                </Badge>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-sm font-medium text-white/60">
                  <div className="p-2.5 bg-white/5 rounded-xl"><Mail className="w-4 h-4" /></div>
                  {member.email}
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-white/60">
                  <div className="p-2.5 bg-white/5 rounded-xl"><Phone className="w-4 h-4" /></div>
                  {member.phone}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Subscriber Since</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {member.joinDate}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Asset Activity</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <BookOpen className="w-3.5 h-3.5 text-secondary" />
                    {member.borrows} Transmissions
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <Button variant="outline" className="flex-1 rounded-xl bg-white/5 border-white/5 font-bold hover:bg-white/10 text-xs tracking-widest">VIEW PROFILE</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-10 w-10 rounded-xl bg-white/5 border-white/5 p-0 hover:bg-white/10">
                      <MoreHorizontal className="w-5 h-5 text-white/40" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card border-white/10 rounded-2xl p-2 min-w-[180px] shadow-2xl">
                    <DropdownMenuItem onClick={() => handleEdit(member)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                      Edit Profile <Edit2 className="w-4 h-4 opacity-30" />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem onClick={() => deleteMember(member.id)} className="rounded-xl p-3 font-bold text-rose-400 hover:bg-rose-400/10 cursor-pointer flex items-center justify-between">
                      Deactivate <Trash2 className="w-4 h-4" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-[40px] p-24 text-center space-y-8">
          <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto border border-dashed border-white/20">
            <UserPlus className="w-10 h-10 text-white/10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline text-white tracking-tight">No matching entities</h2>
            <p className="text-white/30 text-lg max-w-sm mx-auto font-medium">Your current search query did not reveal any matching community members.</p>
          </div>
          <Button variant="outline" onClick={() => setSearch("")} className="rounded-2xl h-12 px-8 border-white/10 text-white font-bold hover:bg-white/5 uppercase tracking-widest text-[10px]">
            RESET DIRECTORY
          </Button>
        </div>
      )}

      {/* Member Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold font-headline text-white tracking-tight">
              {editingMember ? "Edit Identity" : "New Community Link"}
            </DialogTitle>
            <DialogDescription className="text-white/40">Register a new subscriber or update existing credentials.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Full Legal Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="Alexander Thorne"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Secure Email Address</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="alex@nexus.io"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Contact Terminal</Label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <DialogFooter className="pt-6 border-t border-white/5 gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="h-14 px-8 rounded-2xl text-white/40 hover:text-white">ABORT</Button>
              <Button type="submit" className="h-14 px-10 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] transition-all flex-1">
                {editingMember ? "UPDATE PROFILE" : "INITIALIZE MEMBERSHIP"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
