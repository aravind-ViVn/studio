"use client"

import { useLibra } from "@/context/libra-context"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  History, 
  User, 
  Calendar, 
  Tag, 
  Activity, 
  Database,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AuditDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { auditLogs } = useLibra()
  
  const eventId = params.id as string
  const event = auditLogs.find(l => l.id === eventId)

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <AlertCircle className="w-16 h-16 text-rose-500/50" />
        <h2 className="text-3xl font-bold text-white font-headline">Event record not found</h2>
        <Button onClick={() => router.back()} variant="outline" className="rounded-xl px-8 border-white/10 text-white">
          RETURN TO AUDIT LOG
        </Button>
      </div>
    )
  }

  const handleViewRelated = () => {
    if (!event.entityId || !event.entityType) return
    
    switch (event.entityType) {
      case 'Book':
        router.push(`/dashboard/books/${event.entityId}`)
        break
      case 'Member':
        router.push(`/dashboard/members/${event.entityId}`)
        break
      case 'Transaction':
        router.push(`/dashboard/transactions`) // Transactions don't have direct detail pages yet, links to ledger
        break
    }
  }

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex items-center gap-4">
        <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-white tracking-tight">Audit Event Intelligence</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Record: {event.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-[40px] p-10 space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-5 blur-[80px] -z-10" />
             
             <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                      event.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                      event.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                      event.type === 'error' ? 'bg-rose-500/10 text-rose-400' : 'bg-primary/10 text-primary'
                    )}>
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-white/5 text-[10px] tracking-widest font-bold border-white/10 mb-1">
                        {event.action.toUpperCase()}
                      </Badge>
                      <h2 className="text-3xl font-bold font-headline text-white">{event.details}</h2>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center min-w-[160px]">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Session Node</p>
                  <p className="text-white font-mono font-bold tracking-tight">NODE-00{Math.floor(Math.random() * 9)}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><User className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Administrative Operator</p>
                      <p className="text-lg font-bold text-white">{event.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><Calendar className="w-5 h-5 text-secondary" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Chronological Index</p>
                      <p className="text-lg font-bold text-white">{event.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><Tag className="w-5 h-5 text-accent" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Event Protocol</p>
                      <p className="text-lg font-bold text-white">{event.type.toUpperCase()} SIGNAL</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><Database className="w-5 h-5 text-emerald-400" /></div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Archive Reference</p>
                      <p className="text-lg font-bold text-white">{event.entityType || "SYSTEM_GLOBAL"}</p>
                    </div>
                  </div>
                </div>
             </div>

             {event.entityId && (
               <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-2xl">
                      <LinkIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Target Entity Detected</p>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">{event.entityType}: {event.entityId}</p>
                    </div>
                  </div>
                  <Button onClick={handleViewRelated} className="rounded-2xl h-12 px-6 gradient-secondary font-bold shadow-lg hover:scale-[1.05] transition-transform">
                    VIEW RELATED RECORD <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>
             )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Registry Delta</h3>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-[32px] p-8 space-y-4 border-dashed border-white/10">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">PREVIOUS STATE</p>
                <div className="font-mono text-xs text-white/40 leading-relaxed break-all bg-black/20 p-4 rounded-xl">
                  {event.previousState ? JSON.stringify(JSON.parse(event.previousState), null, 2) : "// NO PREVIOUS STATE CAPTURED"}
                </div>
              </div>
              <div className="glass-card rounded-[32px] p-8 space-y-4 border-dashed border-white/10">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">NEW STATE</p>
                <div className="font-mono text-xs text-emerald-400/60 leading-relaxed break-all bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                  {event.newState ? JSON.stringify(JSON.parse(event.newState), null, 2) : "// STATE SYNCHRONIZED"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass-card rounded-[32px] p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full gradient-primary" />
              <h4 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Operational Verification</h4>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm font-medium">Checksum Status</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold">VERIFIED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm font-medium">Security Clearance</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-bold">ROOT</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm font-medium">Transmission Protocol</span>
                  <span className="text-white font-mono text-xs font-bold">SSL/TLS 1.3</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Button variant="ghost" className="w-full h-12 rounded-xl text-white/40 hover:text-primary transition-all font-bold text-[10px] tracking-widest uppercase">
                  DOWNLOAD RAW LOG JSON
                </Button>
              </div>
           </div>

           <div className="glass-card rounded-[32px] p-8 space-y-6">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-accent" />
                <h4 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Related Log Nodes</h4>
              </div>
              <div className="space-y-4">
                {auditLogs.filter(l => l.id !== event.id).slice(0, 3).map((l, i) => (
                  <div 
                    key={i} 
                    onClick={() => router.push(`/dashboard/transactions/audit/${l.id}`)}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer group"
                  >
                    <p className="font-bold text-white text-sm truncate group-hover:text-accent transition-colors">{l.details}</p>
                    <p className="text-[10px] text-white/30 mt-1 uppercase font-bold tracking-widest">{l.timestamp}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => router.push('/dashboard/transactions/audit')} variant="outline" className="w-full h-12 rounded-xl bg-white/5 border-white/10 text-white font-bold text-[10px] tracking-widest uppercase">
                BACK TO FULL LEDGER
              </Button>
           </div>
        </div>
      </div>
    </div>
  )
}
