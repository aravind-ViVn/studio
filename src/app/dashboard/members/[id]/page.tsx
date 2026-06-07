"use client"

import { useLibra } from "@/context/libra-context"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  History,
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function MemberProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { members, transactions } = useLibra()
  
  const member = members.find(m => m.id === params.id)
  const memberHistory = transactions.filter(t => t.memberId === params.id)
  const activeLoans = memberHistory.filter(t => t.status !== 'Returned')

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 px-4">
        <AlertCircle className="w-12 h-12 lg:w-16 lg:h-16 text-rose-500/50" />
        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center">Member not found</h2>
        <Button onClick={() => router.back()} variant="outline">RETURN TO DIRECTORY</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-10 animate-in-up">
      <div className="flex items-center gap-4">
        <Button onClick={() => router.back()} variant="ghost" className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-white/5 hover:bg-white/10 shrink-0">
          <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>
        <div className="min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold font-headline text-white tracking-tight truncate">Link Profile</h1>
          <p className="text-white/40 text-[10px] lg:text-sm font-medium uppercase tracking-widest truncate">ID: {member.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          <div className="glass-card rounded-[24px] lg:rounded-[40px] p-6 lg:p-8 text-center relative overflow-hidden">
            <div className={cn("absolute top-0 left-0 w-full h-2", member.color)} />
            
            <Avatar className={cn("w-24 h-24 lg:w-32 lg:h-32 mx-auto mt-6 rounded-[30px] lg:rounded-[40px] border-4 border-white/5 shadow-2xl shrink-0", member.color)}>
              <AvatarFallback className="bg-transparent text-white text-3xl lg:text-4xl font-bold">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <div className="mt-6 lg:mt-8 space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-white truncate">{member.name}</h2>
              <Badge className={cn(
                "rounded-full px-4 py-1.5 font-bold text-[9px] lg:text-[10px] tracking-widest uppercase",
                member.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-white/30"
              )}>
                {member.status}
              </Badge>
            </div>

            <div className="mt-8 lg:mt-10 space-y-3 lg:space-y-4 text-left">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 min-w-0">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white font-medium text-sm lg:text-base truncate">{member.email}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 min-w-0">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-white font-medium text-sm lg:text-base truncate">{member.phone}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 min-w-0">
                <Calendar className="w-5 h-5 text-accent shrink-0" />
                <span className="text-white font-medium text-sm lg:text-base truncate">Joined {member.joinDate}</span>
              </div>
            </div>

            <Button className="w-full h-14 mt-8 lg:mt-10 rounded-2xl gradient-primary font-bold shadow-xl">
              MODIFY IDENTITY
            </Button>
          </div>

          <div className="glass-card rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 lg:p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-2xl lg:text-4xl font-bold text-white">{member.borrows}</p>
                <p className="text-[8px] lg:text-[10px] font-bold text-white/30 uppercase mt-1">LOANS</p>
              </div>
              <div className="p-4 lg:p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-2xl lg:text-4xl font-bold text-emerald-400">98%</p>
                <p className="text-[8px] lg:text-[10px] font-bold text-white/30 uppercase mt-1">TRUST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity & History */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="glass-card rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg lg:text-xl font-bold text-white">Transmissions</h3>
                <Badge className="bg-primary/20 text-primary border-primary/30 shrink-0">{activeLoans.length}</Badge>
              </div>
              {activeLoans.length > 0 ? (
                <div className="space-y-3">
                  {activeLoans.map((tx, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center gap-4">
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm lg:text-base truncate">{tx.bookTitle}</p>
                        <p className="text-[10px] lg:text-xs text-white/30 mt-1 flex items-center gap-2 truncate">
                          <Clock className="w-3 h-3 shrink-0" /> Due: {tx.dueDate}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "font-bold text-[8px] lg:text-[10px] tracking-widest uppercase shrink-0",
                        tx.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-primary/10 text-primary border-primary/20'
                      )}>
                        {tx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30 italic py-4">No active assets.</p>
              )}
            </div>

            <div className="glass-card rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 space-y-4">
              <h3 className="text-lg lg:text-xl font-bold text-white">Engagement</h3>
              <div className="space-y-5 lg:space-y-6 pt-2 lg:pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
                    <span>Loyalty Quotient</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gradient-primary w-4/5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase">
                    <span>Reliability</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gradient-secondary w-[95%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-4">
              <History className="w-5 h-5 text-primary shrink-0" />
              <h3 className="text-xl lg:text-2xl font-bold font-headline text-white tracking-tight">History</h3>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="glass-card rounded-[24px] lg:rounded-[32px] overflow-hidden">
              {memberHistory.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {memberHistory.map((tx, i) => (
                    <div key={i} className="p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4 lg:gap-6 w-full sm:w-auto">
                        <div className={cn(
                          "w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
                          tx.status === 'Returned' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                        )}>
                          {tx.status === 'Returned' ? <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" /> : <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-base lg:text-lg tracking-tight group-hover:text-primary transition-colors truncate">{tx.bookTitle}</p>
                          <p className="text-[9px] lg:text-xs text-white/30 font-bold uppercase tracking-widest mt-1 truncate">
                            Out: {tx.borrowDate} • {tx.status === 'Returned' ? `In: ${tx.returnDate}` : `Due: ${tx.dueDate}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-xl px-3 lg:px-4 py-1.5 lg:py-2 font-bold text-[9px] lg:text-[10px] tracking-widest shrink-0 self-end sm:self-auto",
                        tx.status === 'Returned' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'
                      )}>
                        {tx.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 lg:p-16 text-center space-y-4">
                  <History className="w-10 h-10 lg:w-12 lg:h-12 text-white/5 mx-auto" />
                  <p className="text-white/30 font-medium italic text-sm lg:text-base">No recorded activity.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
