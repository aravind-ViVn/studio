"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Clock, CheckCircle2, AlertTriangle, ExternalLink, Zap } from "lucide-react"

const mockTransactions = [
  { id: "T-8821", book: "The Great Gatsby", member: "Alice Johnson", borrowDate: "Oct 20, 2026", dueDate: "Nov 03, 2026", status: "Borrowed" },
  { id: "T-9012", book: "Dune", member: "David Kim", borrowDate: "Oct 15, 2026", dueDate: "Oct 29, 2026", status: "Overdue" },
  { id: "T-7734", book: "Educated", member: "Robert Smith", borrowDate: "Sep 30, 2026", dueDate: "Oct 14, 2026", status: "Returned", returnDate: "Oct 12, 2026" },
  { id: "T-8945", book: "Silent Spring", member: "Sarah Williams", borrowDate: "Oct 22, 2026", dueDate: "Nov 05, 2026", status: "Borrowed" },
]

export default function TransactionsPage() {
  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Operations</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Tracking the kinetic flow of knowledge assets.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white/5 border-white/10 rounded-2xl h-14 px-8 font-bold text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group">
            <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400 group-hover:scale-110 transition-transform" /> QUICK RETURN
          </Button>
          <Button className="gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
            <ArrowLeftRight className="w-5 h-5 mr-2" /> DISPATCH ASSET
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/5 p-2 rounded-[24px] mb-8 h-16 inline-flex">
          <TabsTrigger value="all" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">ALL FLOWS</TabsTrigger>
          <TabsTrigger value="active" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">ACTIVE LOANS</TabsTrigger>
          <TabsTrigger value="overdue" className="rounded-2xl px-8 font-bold data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400 h-full transition-all">CRITICAL ALERTS</TabsTrigger>
          <TabsTrigger value="history" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">ARCHIVE</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
            <Table>
              <TableHeader className="bg-white/5 border-b border-white/5">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Reference</TableHead>
                  <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Asset & Consignee</TableHead>
                  <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Timeline</TableHead>
                  <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="text-right h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-white/5 border-white/5 transition-all duration-300">
                    <TableCell className="py-6">
                      <div className="font-mono text-sm font-bold text-primary tracking-tighter">{tx.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-lg tracking-tight">{tx.book}</span>
                        <span className="text-sm text-white/40 font-medium">{tx.member}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-white/20" />
                          <span className="text-xs font-bold text-white/60">OUT: {tx.borrowDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={cn("w-3.5 h-3.5", tx.status === 'Overdue' ? 'text-rose-400' : 'text-white/20')} />
                          <span className={cn("text-xs font-bold", tx.status === 'Overdue' ? 'text-rose-400' : 'text-white/40')}>DUE: {tx.dueDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        tx.status === "Borrowed" ? "bg-primary/10 text-primary border border-primary/20" :
                        tx.status === "Returned" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      )}>
                        <Zap className="w-3 h-3 fill-current" />
                        {tx.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-white/10 group transition-all px-4">
                        INSPECT <ExternalLink className="ml-2 w-3 h-3 group-hover:scale-110 transition-transform" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
