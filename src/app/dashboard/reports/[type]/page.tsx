"use client"

import { useParams, useRouter } from "next/navigation"
import { useLibra } from "@/context/libra-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowLeft, 
  BarChart2, 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  Download,
  Calendar,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { books, transactions, members } = useLibra()
  
  const type = params.type as string
  const titles: Record<string, string> = {
    'audit': 'Inventory Audit Intelligence',
    'growth': 'Member Retention Dynamics',
    'velocity': 'Lending Flux Analysis',
    'loss': 'Critical Asset Loss Log'
  }

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-headline text-white tracking-tight">{titles[type] || 'System Intelligence'}</h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">REAL-TIME DATA STREAM • SESSION: {Math.random().toString(36).substring(7).toUpperCase()}</p>
          </div>
        </div>
        <Button className="gradient-primary rounded-2xl h-12 px-6 font-bold shadow-xl">
          <Download className="w-4 h-4 mr-2" /> GENERATE CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {[
          { label: "Confidence Interval", value: "98.4%", icon: BarChart2, color: "text-primary" },
          { label: "Growth Delta", value: "+12.2%", icon: TrendingUp, color: "text-secondary" },
          { label: "Active Nodes", value: "24/24", icon: Layers, color: "text-accent" },
          { label: "System Latency", value: "14ms", icon: AlertCircle, color: "text-emerald-400" },
        ].map((item, i) => (
          <Card key={i} className="glass-card border-none rounded-[28px] overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="p-3 w-fit bg-white/5 rounded-xl">
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
              <div>
                <h3 className="text-3xl font-bold font-headline text-white">{item.value}</h3>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="glass-card rounded-[40px] p-10 space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Granular Data Points</h3>
          <div className="flex gap-2">
            <Badge className="bg-white/5 border-white/10 text-white/40 font-bold uppercase tracking-widest px-3 py-1">LAST 30 DAYS</Badge>
            <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest px-3 py-1">ALL REGIONS</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[24px] hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-mono text-white/30 font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">Analytical Node {Math.floor(Math.random() * 1000)}</h4>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Processed: Oct {10 + i}, 2026 • Verified by System</p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{Math.floor(Math.random() * 500)}</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">METRIC UNITS</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
