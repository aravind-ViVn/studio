"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Clock, AlertCircle, TrendingUp, Calendar } from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from "recharts"

const stats = [
  { label: "Total Books", value: "12,482", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active Members", value: "1,240", icon: Users, iconColor: "text-secondary", bg: "bg-secondary/10" },
  { label: "Borrowed Books", value: "384", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Overdue Alerts", value: "24", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
]

const borrowingData = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 150 },
  { month: "Mar", count: 200 },
  { month: "Apr", count: 180 },
  { month: "May", count: 250 },
  { month: "Jun", count: 300 },
]

const categoryData = [
  { name: "Fiction", value: 400, color: "#314467" },
  { name: "Non-Fiction", value: 300, color: "#338C9B" },
  { name: "Science", value: 200, color: "#4A6EAD" },
  { name: "Arts", value: 278, color: "#7BA3C8" },
  { name: "History", value: 189, color: "#B0C4DE" },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in-up">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Library Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-white px-4 py-2 rounded-lg border shadow-sm">
          <Calendar className="w-4 h-4 text-secondary" />
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-4 h-4", stat.color || "text-secondary")} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 font-medium">+4.5%</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Borrowing Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={borrowingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="count" fill="#314467" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Popular Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}