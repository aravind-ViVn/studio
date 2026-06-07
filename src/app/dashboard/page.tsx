"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { 
  BookOpen, 
  Users, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Books", value: "12,482", icon: BookOpen, gradient: "gradient-primary", trend: "+4.5%", href: "/dashboard/books" },
  { label: "Total Members", value: "1,240", icon: Users, gradient: "gradient-secondary", trend: "+12%", href: "/dashboard/members" },
  { label: "Active Loans", value: "384", icon: Clock, gradient: "bg-orange-500", trend: "+2%", href: "/dashboard/transactions" },
  { label: "Overdue Books", value: "24", icon: AlertCircle, gradient: "bg-rose-500", trend: "-5%", href: "/dashboard/transactions" },
]

const activities = [
  { user: "Alice Johnson", action: "borrowed", item: "The Great Gatsby", time: "2h ago", color: "bg-primary" },
  { user: "David Kim", action: "returned", item: "Dune", time: "4h ago", color: "bg-secondary" },
  { user: "Sarah Williams", action: "joined", item: "New Membership", time: "1d ago", color: "bg-accent" },
  { user: "James Wilson", action: "borrowed", item: "Zero to One", time: "5h ago", color: "bg-primary" },
  { user: "Maria Garcia", action: "returned", item: "Silent Spring", time: "1d ago", color: "bg-secondary" },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="space-y-6 lg:space-y-10 animate-in-up">
      {/* Hero Header */}
      <div className="relative p-6 lg:p-10 rounded-[24px] lg:rounded-[32px] overflow-hidden glass-card">
        <div className="absolute top-0 right-0 w-[300px] h-full gradient-primary opacity-20 blur-[80px]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-primary-foreground uppercase tracking-widest border border-white/10 font-headline">
              <Activity className="w-3 h-3 text-secondary" />
              Real-time Insights
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-headline text-white tracking-tight">Good morning, Jane.</h1>
            <p className="text-muted-foreground text-base lg:text-lg max-w-xl font-body">
              Your library collection is performing well. We've seen a <span className="text-white font-bold">15% increase</span> in member activity this month.
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <Button size="lg" onClick={() => router.push('/dashboard/transactions')} className="w-full md:w-auto rounded-2xl h-14 px-8 gradient-primary font-headline font-semibold shadow-lg hover:scale-[1.02] transition-transform">
              <Plus className="w-5 h-5 mr-2" /> NEW DISPATCH
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            onClick={() => router.push(stat.href)}
            className="glass-card border-none rounded-[24px] lg:rounded-[28px] overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-5 lg:p-6">
              <div className="flex justify-between items-start mb-4 lg:mb-6">
                <div className={cn("p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg", stat.gradient)}>
                  <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1 font-headline">Status</span>
                  <div className="flex items-center gap-1 text-[10px] lg:text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg font-headline">
                    <TrendingUp className="w-3 h-3" /> {stat.trend}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs lg:text-sm font-bold text-white/50 uppercase tracking-widest mb-1 font-headline">{stat.label}</p>
                <h3 className="text-2xl lg:text-4xl font-bold font-headline text-white">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Log */}
      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        <Card className="glass-card border-none rounded-[24px] lg:rounded-[32px] p-2">
          <CardHeader className="p-4 lg:p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl lg:text-2xl font-headline font-bold text-white">Recent Activity</CardTitle>
                <p className="text-xs lg:text-sm text-white/40 font-medium font-body">Latest system events</p>
              </div>
              <Button onClick={() => router.push('/dashboard/transactions')} variant="ghost" className="text-[10px] font-headline font-semibold tracking-widest text-primary hover:bg-primary/10 rounded-xl">
                VIEW HISTORY <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-8 pt-0 space-y-4 lg:space-y-6">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-colors">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg", act.color)}>
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 border-b border-white/5 pb-4 group-last:border-none">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-white truncate font-body">{act.user}</p>
                    <span className="text-[10px] font-bold text-white/30 uppercase shrink-0 font-headline">{act.time}</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1 font-body">
                    Successfully <span className={cn("font-bold", act.action === 'returned' ? 'text-secondary' : 'text-primary')}>{act.action}</span> {act.item}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
