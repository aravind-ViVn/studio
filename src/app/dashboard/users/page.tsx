"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ShieldCheck, 
  ShieldAlert, 
  UserX, 
  UserCheck, 
  Edit2,
  Trash2,
  Mail,
  Calendar,
  Lock
} from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SystemUser, UserRole } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const INITIAL_USERS: SystemUser[] = [
  { id: 'u1', name: 'Jane Doe', email: 'admin@libraflow.com', role: 'Super Admin', status: 'Active', joinDate: 'Oct 2024' },
  { id: 'u2', name: 'John Smith', email: 'librarian@libraflow.com', role: 'Librarian', status: 'Active', joinDate: 'Nov 2024' },
  { id: 'u3', name: 'Sarah Wilson', email: 'sarah.w@libraflow.com', role: 'Librarian', status: 'Inactive', joinDate: 'Jan 2025' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [targetUser, setTargetUser] = useState<SystemUser | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Librarian" as UserRole
  })

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddNew = () => {
    setEditingUser(null)
    setFormData({ name: "", email: "", password: "", role: "Librarian" })
    setIsModalOpen(true)
  }

  const handleEdit = (user: SystemUser) => {
    setEditingUser(user)
    setFormData({ name: user.name, email: user.email, password: "", role: user.role })
    setIsModalOpen(true)
  }

  const handleStatusToggle = (user: SystemUser) => {
    setTargetUser(user)
    setIsStatusModalOpen(true)
  }

  const confirmStatusToggle = () => {
    if (!targetUser) return
    const newStatus = targetUser.status === 'Active' ? 'Inactive' : 'Active'
    setUsers(prev => prev.map(u => u.id === targetUser.id ? { ...u, status: newStatus } : u))
    toast({
      title: `User ${newStatus === 'Active' ? 'Enabled' : 'Disabled'}`,
      description: `${targetUser.name} status updated to ${newStatus}.`
    })
    setIsStatusModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role } : u))
      toast({ title: "User Updated", description: `${formData.name} credentials synchronized.` })
    } else {
      const newUser: SystemUser = {
        id: `u-${Math.random().toString(36).substr(2, 5)}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'Active',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }
      setUsers(prev => [...prev, newUser])
      toast({ title: "User Created", description: `Access granted for ${formData.name}.` })
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">System Authority</h1>
          <p className="text-white/50 text-lg mt-1 font-medium font-body">Manage staff credentials and access protocols.</p>
        </div>
        <Button onClick={handleAddNew} className="gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
          <Plus className="w-5 h-5 mr-2" /> CREATE OPERATOR
        </Button>
      </div>

      <div className="relative glass-card p-2 rounded-[28px] max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input 
          placeholder="Filter by name, email or access level..." 
          className="pl-14 h-14 bg-transparent border-none text-lg placeholder:text-white/20 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Operator</TableHead>
              <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Access Level</TableHead>
              <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Registry Date</TableHead>
              <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Protocol Status</TableHead>
              <TableHead className="text-right h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.id} className="hover:bg-white/5 border-white/5 transition-all duration-300 group">
                <TableCell className="py-6 px-8">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg",
                      u.role === 'Super Admin' ? 'gradient-primary' : 'gradient-secondary'
                    )}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{u.name}</p>
                      <p className="text-xs text-white/40 font-medium">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {u.role === 'Super Admin' ? <ShieldCheck className="w-4 h-4 text-primary" /> : <ShieldAlert className="w-4 h-4 text-secondary" />}
                    <span className="font-bold text-white/80">{u.role}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-white/40">{u.joinDate}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "rounded-xl px-4 py-1.5 font-bold text-[10px] tracking-widest uppercase",
                    u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  )}>
                    {u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10">
                        <MoreHorizontal className="w-5 h-5 text-white/40" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card border-white/10 rounded-2xl p-2 min-w-[200px] shadow-2xl">
                      <DropdownMenuLabel className="text-white/40 text-[10px] uppercase font-bold tracking-widest p-2">Operations</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(u)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                        Edit Credentials <Edit2 className="w-4 h-4 opacity-30" />
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusToggle(u)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                        {u.status === 'Active' ? 'Disable Account' : 'Enable Account'} 
                        {u.status === 'Active' ? <UserX className="w-4 h-4 opacity-30" /> : <UserCheck className="w-4 h-4 opacity-30" />}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem className="rounded-xl p-3 font-bold text-rose-400 hover:bg-rose-400/10 cursor-pointer flex items-center justify-between">
                        Purge Record <Trash2 className="w-4 h-4" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl font-body">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold font-headline text-white tracking-tight">
              {editingUser ? "Modify Operator" : "Grant Authorization"}
            </DialogTitle>
            <DialogDescription className="text-white/40">Configure administrative access for the LibraFlow core.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Legal Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="Julian Vane"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Protocol Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-14 pl-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                  placeholder="name@libraflow.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Access Credential (Password)</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-14 pl-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                  placeholder="••••••••"
                  required={!editingUser}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Authority Level</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as UserRole })}>
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10 rounded-2xl">
                  <SelectItem value="Super Admin" className="font-bold">Super Admin (All Protocols)</SelectItem>
                  <SelectItem value="Librarian" className="font-bold">Librarian (Limited Access)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-6 border-t border-white/5 gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="h-14 px-8 rounded-2xl text-white/40">ABORT</Button>
              <Button type="submit" className="h-14 px-10 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] transition-all flex-1">
                {editingUser ? "SYNC CREDENTIALS" : "INITIALIZE ACCESS"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Status Toggle Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[400px] p-10 text-center space-y-6 shadow-2xl font-body">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
            targetUser?.status === 'Active' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-400'
          )}>
            {targetUser?.status === 'Active' ? <UserX className="w-10 h-10" /> : <UserCheck className="w-10 h-10" />}
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold font-headline text-white">
              {targetUser?.status === 'Active' ? 'Disable Access?' : 'Enable Access?'}
            </DialogTitle>
            <DialogDescription className="text-white/40">
              {targetUser?.status === 'Active' 
                ? `Revoking credentials for ${targetUser.name} will prevent all system access.` 
                : `Reinstating access for ${targetUser?.name}.`}
            </DialogDescription>
          </div>
          <div className="flex gap-4 pt-4">
            <Button onClick={() => setIsStatusModalOpen(false)} variant="ghost" className="flex-1 h-12 rounded-xl text-white/40">CANCEL</Button>
            <Button 
              onClick={confirmStatusToggle} 
              className={cn("flex-1 h-12 rounded-xl font-bold", targetUser?.status === 'Active' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600')}
            >
              CONFIRM
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
