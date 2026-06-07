"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Save, 
  Zap,
  Cloud,
  Terminal,
  Building,
  Lock,
  History,
  Smartphone
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("identity")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  const sections = [
    { id: "identity", label: "Identity & Profile", icon: User },
    { id: "library", label: "Library Core", icon: Building },
    { id: "notifications", label: "Alert Config", icon: Bell },
    { id: "security", label: "Secure Layer", icon: Shield },
    { id: "theme", label: "Visual Interface", icon: Palette },
    { id: "localization", label: "Localization", icon: Globe }
  ]

  return (
    <div className="space-y-12 animate-in-up max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">System Terminal</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Configure global protocols and administrative identities.</p>
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

          <Card className="glass-card border-none rounded-[32px] overflow-hidden mt-10">
            <CardContent className="p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl gradient-secondary flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-lg">Nexus Pro</h4>
                <p className="text-xs text-white/40 font-medium leading-relaxed">Enterprise license active until 2027. Full AI-discovery enabled.</p>
              </div>
              <Button className="w-full h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 font-bold tracking-widest text-[10px]">
                VIEW LICENSE
              </Button>
            </CardContent>
          </Card>
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
                  <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-[40px] gradient-primary flex items-center justify-center text-4xl font-bold text-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      JD
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center border-4 border-[#0F172A] shadow-lg group-hover:rotate-12 transition-transform">
                      <Palette className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-bold text-white">Jane Doe</h4>
                    <p className="text-white/40 font-medium italic">Nexus Super Administrator (L9 Clearance)</p>
                    <div className="flex gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30 font-bold px-3 py-1">ROOT AUTH</Badge>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold px-3 py-1">ENCRYPTED</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">System Alias</Label>
                    <Input defaultValue="Jane.Admin" className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Secure Uplink (Email)</Label>
                    <Input defaultValue="jane@libraflow.io" className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Change Keycode (Password)</Label>
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
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Library Core Settings</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="glass-card rounded-[32px] p-10 grid grid-cols-2 gap-8">
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Registry Name</Badge>
                  <Input defaultValue="Central Archive Nexus 01" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Physical Location</Badge>
                  <Input defaultValue="Sub-Level 4, Science District" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Contact Terminal</Badge>
                  <Input defaultValue="+1 (555) 900-FLOW" className="h-14 bg-white/5 border-white/5 rounded-2xl text-white" />
                </div>
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Security & Encryption</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="space-y-6">
                <div className="glass-card p-8 rounded-[32px] flex items-center justify-between">
                   <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <History className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg tracking-tight">Login Logs</h4>
                      <p className="text-xs text-white/30 font-medium">View historical access points for this terminal.</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl font-bold text-[10px] tracking-widest">VIEW LOGS</Button>
                </div>
                <div className="glass-card p-8 rounded-[32px] flex items-center justify-between">
                   <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Smartphone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg tracking-tight">Active Devices</h4>
                      <p className="text-xs text-white/30 font-medium">Manage sessions across mobile and desktop nodes.</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 font-bold">3 ACTIVE</Badge>
                </div>
              </div>
            </section>
          )}

          {activeTab === "theme" && (
            <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Visual Protocols</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {["System", "Dark", "Light"].map((mode) => (
                  <div key={mode} className={cn(
                    "glass-card p-8 rounded-[32px] text-center cursor-pointer hover:border-primary/50 transition-all",
                    mode === "Dark" ? "border-primary/50 ring-1 ring-primary/50" : ""
                  )}>
                    <div className={cn("w-full aspect-video rounded-2xl mb-4", mode === "Dark" ? "bg-slate-900" : mode === "Light" ? "bg-white" : "bg-gradient-to-br from-slate-900 to-white")} />
                    <span className="font-bold text-white tracking-widest text-xs uppercase">{mode} MODE</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(activeTab === "notifications" || activeTab === "localization") && (
             <section className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-headline text-white tracking-tight">System Preferences</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Real-time Notifications", desc: "Instant alerts for overdue assets.", icon: Bell, default: true },
                  { title: "Interface Theme", desc: "High-contrast slate interface.", icon: Palette, default: true },
                  { title: "Cloud Synchronization", desc: "Auto-backup to secure nodes.", icon: Cloud, default: true },
                  { title: "Developer Terminal", desc: "Command-line shortcuts.", icon: Terminal, default: false }
                ].map((pref, i) => (
                  <div key={i} className="glass-card p-8 rounded-[32px] flex items-center justify-between group hover:border-primary/30 transition-all">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                        <pref.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-lg tracking-tight">{pref.title}</h4>
                        <p className="text-xs text-white/30 font-medium leading-relaxed max-w-[200px]">{pref.desc}</p>
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
    </div>
  )
}
