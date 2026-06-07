"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { BookOpen, Lock, User, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      router.push("/dashboard")
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border">
        
        {/* Left Side - Visual Hero */}
        <div className="hidden lg:block relative bg-primary p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-4 gap-4 p-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-32 bg-white/20 rounded-lg transform rotate-12" />
              ))}
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-between z-10">
            <div className="flex items-center gap-3 text-white">
              <BookOpen className="w-8 h-8 text-secondary" />
              <span className="text-2xl font-bold font-headline tracking-tight">LibraFlow</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-headline font-bold text-white leading-tight">
                Empowering Knowledge through Digital Excellence.
              </h1>
              <p className="text-white/70 text-lg">
                Manage your collections, track movements, and discover hidden gems with our AI-powered library ecosystem.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-white/50 text-sm font-medium">
              <span>Admin v2.4.0</span>
              <span>•</span>
              <span>Encrypted JWT Sessions</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold font-headline text-primary">Staff Login</h2>
              <p className="text-muted-foreground">Welcome back. Please enter your credentials.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="librarian@libraflow.com" 
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs text-secondary hover:underline font-medium">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign In to Dashboard"
                )}
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Trusted System</span></div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              By logging in, you agree to our Terms of Service and Privacy Policy. All actions are audited.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}