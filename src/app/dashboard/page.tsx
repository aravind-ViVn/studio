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
  ArrowUpRight,
  Activity
} from "lucide-react"
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Books", value: "12,482", icon: BookOpen, gradient: "gradient-primary", trend: "+4.5%", href: "/dashboard/books" },
  { label: "Active Members", value: "1,240", icon: Users, gradient: "gradient-secondary", trend: "+12%", href: "/dashboard/members" },
  { label: "Borrowed Today", value: "384", icon: Clock, gradient: "bg-orange-500", trend: "+2%", href: "/dashboard/transactions" },
  { label: "Pending Alerts", value: "24", icon: AlertCircle, gradient: "bg-rose-500", trend: "-5%", href: "/dashboard/transactions" },
]

const borrowingData = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 150 },
  { month: "Mar", count: 200 },
  { month: "Apr", count: 180 },
  { month: "May", count: 250 },
  { month: "Jun", count: 300 },
]

const activities = [
  { user: "Alice Johnson", action: "borrowed", item: "The Great Gatsby", time: "2h ago", color: "bg-primary" },
  { user: "David Kim", action: "returned", item: "Dune", time: "4h ago", color: "bg-secondary" },
  { user: "Sarah Williams", action: "joined", item: "New Membership", time: "1d ago", color: "bg-accent" },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="space-y-10 animate-in-up">
      {/* Hero Header */}
      <div className="relative p-10 rounded-[32px] overflow-hidden glass-card">
        <div className="absolute top-0 right-0 w-[300px] h-full gradient-primary opacity-20 blur-[80px]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-primary-foreground uppercase tracking-widest border border-white/10">
              <Activity className="w-3 h-3 text-secondary" />
              Real-time Analytics
            </div>
            <h1 className="text-5xl font-bold font-headline text-white tracking-tight">Good morning, Jane.</h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Your library is seeing a <span className="text-white font-bold">15% increase</span> in engagement this week. Here's a summary of today's activities.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => router.push('/dashboard/transactions')} className="rounded-2xl h-14 px-8 gradient-primary font-bold shadow-lg hover:scale-[1.02] transition-transform">
              <Plus className="w-5 h-5 mr-2" /> NEW TRANSACTION
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card 
            key={i} 
            onClick={() => router.push(stat.href)}
            className="glass-card border-none rounded-[28px] overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl shadow-lg", stat.gradient)}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Growth</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3" /> {stat.trend}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white/50 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-4xl font-bold font-headline text-white">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none rounded-[32px] p-2">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-headline font-bold text-white">Engagement Flow</CardTitle>
                <p className="text-sm text-white/40 font-medium">Monthly lending trends over time</p>
              </div>
              <Button onClick={() => router.push('/dashboard/reports')} variant="outline" size="sm" className="bg-white/5 border-white/10 rounded-xl text-xs font-bold">
                VIEW FULL REPORT <ArrowUpRight className="ml-2 w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] p-6 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={borrowingData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600}} 
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}} 
                  itemStyle={{color: '#fff'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#7C3AED" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-none rounded-[32px] p-2">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-headline font-bold text-white">Activity Log</CardTitle>
            <p className="text-sm text-white/40 font-medium">Recent events from your staff</p>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg", act.color)}>
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 border-b border-white/5 pb-4 group-last:border-none">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-white truncate">{act.user}</p>
                    <span className="text-[10px] font-bold text-white/30 uppercase shrink-0">{act.time}</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    Successfully <span className="text-secondary">{act.action}</span> {act.item}
                  </p>
                </div>
              </div>
            ))}
            <Button onClick={() => router.push('/dashboard/transactions')} variant="ghost" className="w-full text-xs font-bold tracking-widest text-primary hover:bg-primary/10 rounded-xl mt-4">
              SEE ALL ACTIVITY <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
