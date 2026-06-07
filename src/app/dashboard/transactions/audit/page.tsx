"use client"

import { useLibra } from "@/context/libra-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, History, Filter, Download, User, Info, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AuditLogPage() {
  const router = useRouter()
  const { auditLogs } = useLibra()

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-headline text-white tracking-tight">System Audit Log</h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Chronological events & Administrative actions</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl bg-white/5 border-white/5 text-xs font-bold uppercase tracking-widest">
            <Filter className="w-4 h-4 mr-2" /> FILTER
          </Button>
          <Button className="h-12 rounded-xl gradient-primary font-bold px-6">
            <Download className="w-4 h-4 mr-2" /> DOWNLOAD LOGS
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-10 space-y-8">
          {auditLogs.length > 0 ? (
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                      log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                      log.type === 'error' ? 'bg-rose-500/10 text-rose-400' : 'bg-primary/10 text-primary'
                    )}>
                      {log.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> :
                       log.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> :
                       log.type === 'error' ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-white/5 text-[10px] tracking-widest font-bold border-white/10">
                          {log.action}
                        </Badge>
                        <span className="text-white font-bold text-lg tracking-tight">{log.details}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> {log.timestamp}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {log.user}</span>
                        <span className="text-primary/40">ID: {log.id}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-10 w-10 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6">
              <History className="w-16 h-16 text-white/5 mx-auto" />
              <p className="text-white/30 font-medium italic">No audit records found in current session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
