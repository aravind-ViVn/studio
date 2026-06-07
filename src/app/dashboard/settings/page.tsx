"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Save, 
  Zap,
  Lock,
  Cloud,
  Terminal
} from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-12 animate-in-up max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">System Configuration</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Fine-tune the LibraFlow experience and administrative protocols.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gradient-primary rounded-2xl h-14 px-10 font-bold shadow-lg hover:scale-[1.02] transition-all">
          {isSaving ? "SYNCHRONIZING..." : <><Save className="w-5 h-5 mr-2" /> SAVE PROTOCOLS</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="lg:col-span-1 space-y-4">
          <nav className="flex flex-col space-y-2">
            {[
              { label: "Identity & Profile", icon: User, active: true },
              { label: "Notification Core", icon: Bell },
              { label: "Security & Access", icon: Shield },
              { label: "Data Management", icon: Database },
              { label: "Interface Theme", icon: Palette },
              { label: "Localization", icon: Globe }
            ].map((item, i) => (
              <Button 
                key={i} 
                variant="ghost" 
                className={cn(
                  "justify-start h-14 rounded-2xl px-6 font-bold transition-all",
                  item.active ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 mr-3", item.active ? "text-primary" : "text-white/20")} />
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
                <h4 className="font-bold text-white text-lg">Pro Subscription</h4>
                <p className="text-xs text-white/40 font-medium leading-relaxed">Your license is valid until Oct 2027. Enjoy unlimited cloud syncing and AI discovery.</p>
              </div>
              <Button className="w-full h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 font-bold tracking-widest text-[10px]">
                MANAGE BILLING
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-10">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Administrative Identity</h3>
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
                  <p className="text-white/40 font-medium italic">LibraFlow Super Administrator (Level 9)</p>
                  <div className="flex gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30 font-bold px-3 py-1">CORE AUTH</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold px-3 py-1">VERIFIED</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Display Username</Label>
                  <Input defaultValue="Jane.Admin" className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Secure Email</Label>
                  <Input defaultValue="jane@libraflow.io" className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold font-headline text-white tracking-tight">System Preferences</h3>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Real-time Notifications", desc: "Receive instant alerts for overdue assets and new registrations.", icon: Bell, default: true },
                { title: "Dark Mode Interface", desc: "Enable the high-contrast slate theme for long-term usage.", icon: Palette, default: true },
                { title: "Cloud Backup", desc: "Automatically synchronize local database with secure cloud nodes.", icon: Cloud, default: true },
                { title: "Terminal Mode", desc: "Enable advanced command-line shortcuts and debug logging.", icon: Terminal, default: false }
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
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
