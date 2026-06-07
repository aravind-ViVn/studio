"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Lock, User, Loader2, Sparkles, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    const success = await login(email, password, rememberMe)
    if (!success) {
      setError("Invalid email or password")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 lg:p-6 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 glass-card rounded-[24px] lg:rounded-[32px] overflow-hidden animate-fade-in shadow-2xl">
        
        {/* Visual Side (Hidden on Mobile) */}
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
            <span>Core Engine v4.0</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Secure Access</span>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-8 lg:p-20 flex flex-col justify-center font-body">
          <div className="w-full max-w-sm mx-auto space-y-10">
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-bold font-headline text-white tracking-tight">Staff Portal</h2>
              <p className="text-muted-foreground text-base lg:text-lg">Enter secure credentials to continue.</p>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 text-sm font-bold animate-in-up">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-white/70 ml-1">Work Email</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="admin@libraflow.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all text-base lg:text-lg w-full"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" title="Password" className="text-sm font-bold text-white/70">Password</Label>
                    <Link href="/forgot-password" title="Forgot Password" className="text-[10px] text-secondary hover:text-secondary/80 font-bold tracking-wide font-headline uppercase">RECOVER ACCESS</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 transition-all text-base lg:text-lg w-full"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3 px-1">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="h-6 w-6 rounded-lg border-white/10 data-[state=checked]:bg-primary shrink-0"
                  />
                  <label htmlFor="remember" className="text-xs lg:text-sm font-bold text-white/50 cursor-pointer select-none">Remember session</label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 gradient-primary text-white rounded-2xl font-headline font-semibold text-base lg:text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
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

            <div className="pt-10 border-t border-white/5 text-center">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] font-headline">
                LibraFlow Protocol © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
