"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Lock, User, Loader2, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 glass-card rounded-[32px] overflow-hidden animate-fade-in">
        
        {/* Left Side - Hero */}
        <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden gradient-primary">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white mb-12">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="text-3xl font-bold font-headline tracking-tighter">LibraFlow</span>
            </div>
            
            <div className="space-y-8 mt-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white/90 font-headline">
                <Sparkles className="w-3 h-3" />
                Next-Gen Archive System
              </div>
              <h1 className="text-6xl font-headline font-bold text-white leading-[1.1] tracking-tight">
                Design <br />For The <br /><span className="text-white/60">Modern Era.</span>
              </h1>
              <p className="text-white/80 text-xl max-w-sm font-medium leading-relaxed font-body">
                Streamlining knowledge discovery with beautiful, high-performance library management.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center gap-6 text-white/40 text-sm font-bold tracking-widest uppercase font-headline">
            <span>Enterprise v4.0</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Secure Access</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 lg:p-20 flex flex-col justify-center font-body">
          <div className="w-full max-w-sm mx-auto space-y-10">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold font-headline text-white tracking-tight">Staff Portal</h2>
              <p className="text-muted-foreground text-lg">Enter your secure credentials to continue.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-white/70 ml-1 font-body">Work Email</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@libraflow.io" 
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all text-lg font-body"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" title="Password" className="text-sm font-semibold text-white/70 font-body">Password</Label>
                    <button type="button" className="text-xs text-secondary hover:text-secondary/80 font-bold tracking-wide font-headline">RECOVER ACCESS</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all text-lg font-body"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 gradient-primary text-white rounded-2xl font-headline font-semibold text-lg shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </div>
                ) : (
                  "ENTER DASHBOARD"
                )}
              </Button>
            </form>

            <div className="pt-10 border-t border-white/5">
              <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] font-headline">
                LibraFlow Security © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
