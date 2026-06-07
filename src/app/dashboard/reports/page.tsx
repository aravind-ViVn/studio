"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { 
  FileText, 
  Download, 
  TrendingUp, 
  BarChart2, 
  AlertCircle,
  Layers
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from "recharts"
import { cn } from "@/lib/utils"

const categoryData = [
  { name: "Fiction", value: 400, color: "#7C3AED" },
  { name: "Science", value: 300, color: "#2563EB" },
  { name: "Arts", value: 200, color: "#06B6D4" },
  { name: "History", value: 278, color: "#14B8A6" },
  { name: "Others", value: 189, color: "#F59E0B" },
]

const reportTypes = [
  { id: 'audit', title: "Inventory Audit", description: "Complete collection valuation and health report.", icon: BarChart2, color: "text-primary", bg: "bg-primary/10" },
  { id: 'growth', title: "Member Growth", description: "Acquisition and retention metrics over 12 months.", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
  { id: 'velocity', title: "Lending Velocity", description: "Average duration and turnover for popular genres.", icon: Layers, color: "text-accent", bg: "bg-accent/10" },
  { id: 'loss', title: "Asset Loss", description: "Detailed summary of damaged or unreturned items.", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
]

export default function ReportsPage() {
  const router = useRouter()

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Intelligence</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Deep-dive analytics and performance reporting.</p>
        </div>
        <div className="p-1 bg-white/5 border border-white/5 rounded-2xl flex">
          <Button variant="ghost" size="sm" className="rounded-xl px-4 font-bold text-white text-xs bg-white/10">MONTHLY</Button>
          <Button variant="ghost" size="sm" className="rounded-xl px-4 font-bold text-white/40 text-xs">QUARTERLY</Button>
          <Button variant="ghost" size="sm" className="rounded-xl px-4 font-bold text-white/40 text-xs">YEARLY</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card border-none rounded-[32px] p-2 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl font-bold text-xs">
              <TrendingUp className="w-4 h-4" /> +24% YOY
            </div>
          </div>
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-headline font-bold text-white">Genre Distribution</CardTitle>
            <p className="text-sm text-white/40 font-medium">Breakdown of library assets by category</p>
          </CardHeader>
          <CardContent className="h-[300px] p-6 pt-0 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full h-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{cat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none rounded-[32px] p-2">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-headline font-bold text-white">Lending History</CardTitle>
                <p className="text-sm text-white/40 font-medium">Transaction volume by segment</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] p-6 pt-0">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report, i) => (
          <Card key={i} onClick={() => router.push(`/dashboard/reports/${report.id}`)} className="glass-card border-none rounded-[32px] overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-pointer">
            <div className="h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="p-6">
              <div className={cn("w-12 h-12 rounded-[18px] flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:rotate-12", report.bg)}>
                <report.icon className={cn("w-6 h-6", report.color)} />
              </div>
              <CardTitle className="text-xl font-headline font-bold text-white">{report.title}</CardTitle>
              <p className="text-sm text-white/40 font-medium mt-2 leading-relaxed">{report.description}</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <Button size="sm" className="w-full bg-white/5 border border-white/5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-primary transition-all">
                DRILL DOWN
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-none rounded-[32px] p-4">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-headline font-bold text-white tracking-tight">Recent Exports</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-5">
                <div className="p-3 gradient-primary rounded-xl shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight">Financial_Audit_Q4_2026.pdf</h4>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Oct 31, 2026 • 2.4 MB • Admin_Jane</p>
                </div>
              </div>
              <Button variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-primary transition-all">
                <Download className="w-5 h-5 text-white" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
