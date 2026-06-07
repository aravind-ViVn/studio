"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSent(true)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 overflow-hidden relative font-body">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md glass-card rounded-[32px] p-10 space-y-10 animate-fade-in relative shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-headline">
          <ArrowLeft className="w-4 h-4" /> Back to Portal
        </Link>

        {isSent ? (
          <div className="text-center space-y-6 py-10">
            <div className="w-20 h-20 rounded-[28px] bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline text-white tracking-tight">Check your email</h2>
              <p className="text-white/40 font-medium">We've sent recovery instructions to {email}</p>
            </div>
            <Button asChild className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 font-bold hover:bg-white/10 transition-all">
              <Link href="/">RETURN TO LOGIN</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Access Recovery</h1>
              <p className="text-white/40 text-lg font-medium">Enter your registered email address to receive a reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Staff Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input 
                    type="email" 
                    placeholder="name@libraflow.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-14 gradient-primary rounded-2xl font-bold shadow-xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SEND RECOVERY LINK"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
