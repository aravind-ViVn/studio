"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Save, 
  Zap,
  Lock,
  History,
  Smartphone,
  Globe,
  Mail
} from "lucide-react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const { user, updateProfile } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || "identity")
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      updateProfile(formData)
      setIsSaving(false)
    }, 1000)
  }

  const sections = [
    { id: "identity", label: "My Profile", icon: User },
    { id: "library", label: "Library Core", icon: Database },
    { id: "notifications", label: "Alert Config", icon: Bell },
    { id: "security", label: "Security & Sessions", icon: Shield },
  ]

  return (
    <div className="space-y-12 animate-in-up max-w-6xl mx-auto font-body">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Account Configuration</h1>
          <p className="text-white/50 text-lg mt-1 font-medium font-body">Manage your administrative credentials and terminal preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gradient-primary rounded-2xl h-14 px-10 font-bold shadow-lg hover:scale-[1.02] transition-all">
          {isSaving ? "SYNCING..." : <><Save className="w-5 h-5 mr-2" /> COMMIT CHANGES</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="lg:col-span-1 space-y-4">
          <nav className="flex flex-col space-y-2">
            {sections.map((item) => (
              <Button 
                key={item.id} 
                variant="ghost" 
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "justify-start h-14 rounded-2xl px-6 font-bold transition-all",
                  activeTab === item.id ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3", activeTab === item.id ? "text-primary" : "text-white/20")} />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-3 space-y-10">
          {activeTab === "identity" && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Identity Profiler</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="glass-card rounded-[32px] p-10 space-y-10">
                <div className="flex items-center gap-10">
                  <div className="w-32 h-32 rounded-[40px] gradient-primary flex items-center justify-center text-4xl font-bold text-white shadow-2xl font-headline">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-white">{user?.name}</h4>
                    <p className="text-white/40 font-medium italic">{user?.role} • Since {user?.joinDate}</p>
                    <div className="flex gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30 font-bold px-3 py-1 text-[10px] tracking-widest uppercase">ROOT AUTH</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Legal Name</Label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Secure Email</Label>
                    <Input 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Change Account Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <Input type="password" placeholder="••••••••••••" className="h-14 pl-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "library" && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Library Configuration</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="glass-card rounded-[32px] p-10 grid grid-cols-2 gap-8">
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Archive Registry Name</Label>
                  <Input defaultValue="Central Archive Nexus 01" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Physical Coordinates</Label>
                  <Input defaultValue="Sub-Level 4, Science District" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Secure Contact Terminal</Label>
                  <Input defaultValue="+1 (555) 900-FLOW" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Authentication & Sessions</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="space-y-6">
                <div className="glass-card p-8 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                   <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                      <History className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg tracking-tight">Login Ledger</h4>
                      <p className="text-xs text-white/40 font-medium font-body">Review historical authentication events.</p>
                    </div>
                  </div>
                  <Button onClick={() => setIsHistoryModalOpen(true)} variant="outline" className="rounded-xl font-bold text-[10px] tracking-widest uppercase px-6 h-10 border-white/10 hover:bg-white/10">VIEW LOGS</Button>
                </div>
                <div className="glass-card p-8 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                   <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                      <Smartphone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg tracking-tight">Kinetic Sessions</h4>
                      <p className="text-xs text-white/40 font-medium font-body">Currently active administrative devices.</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 font-bold text-[10px] tracking-widest">2 ACTIVE</Badge>
                </div>
              </div>
            </section>
          )}

          {activeTab === "notifications" && (
             <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Alert Protocol</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Overdue Alerts", desc: "Instant notifications for critical asset delays.", icon: Zap, default: true },
                  { title: "Email Transmissions", desc: "Weekly summaries sent to root terminal.", icon: Mail, default: true },
                  { title: "System Heartbeat", desc: "Daily maintenance and terminal status updates.", icon: Globe, default: false },
                ].map((pref, i) => (
                  <div key={i} className="glass-card p-8 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                        <pref.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-lg tracking-tight">{pref.title}</h4>
                        <p className="text-xs text-white/40 font-medium leading-relaxed max-w-[160px]">{pref.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={pref.default} className="data-[state=checked]:bg-primary" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Dialog open={isHistoryModalOpen} onOpenChange={setIsHistoryModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl font-body">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold font-headline text-white">Security Log</DialogTitle>
            <DialogDescription className="text-white/40 font-body">Recent successful login events for this identity.</DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
            {[
              { time: "Today • 08:30 AM", device: "Workstation (MBP) - Chrome", ip: "192.168.1.45" },
              { time: "Yesterday • 09:12 AM", device: "Administrative Tablet", ip: "192.168.1.45" },
              { time: "Oct 24, 2026 • 02:45 PM", device: "Workstation (MBP) - Chrome", ip: "10.0.0.12" },
            ].map((log, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-bold text-white font-body">{log.device}</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1 font-headline">{log.time}</p>
                </div>
                <Badge variant="outline" className="text-[10px] text-white/40 border-white/10 font-bold px-2 py-0.5">{log.ip}</Badge>
              </div>
            ))}
          </div>
          <div className="p-8 pt-0">
            <Button onClick={() => setIsHistoryModalOpen(false)} className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all">DISMISS LEDGER</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
