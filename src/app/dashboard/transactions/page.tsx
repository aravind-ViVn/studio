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
import { ArrowLeftRight, Clock, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react"

const mockTransactions = [
  { id: "T1", book: "The Great Gatsby", member: "Alice Johnson", borrowDate: "Oct 20, 2024", dueDate: "Nov 03, 2024", status: "Borrowed" },
  { id: "T2", book: "Dune", member: "David Kim", borrowDate: "Oct 15, 2024", dueDate: "Oct 29, 2024", status: "Overdue" },
  { id: "T3", book: "Educated", member: "Robert Smith", borrowDate: "Sep 30, 2024", dueDate: "Oct 14, 2024", status: "Returned", returnDate: "Oct 12, 2024" },
  { id: "T4", book: "Silent Spring", member: "Sarah Williams", borrowDate: "Oct 22, 2024", dueDate: "Nov 05, 2024", status: "Borrowed" },
]

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Transaction Engine</h1>
          <p className="text-muted-foreground mt-1">Track lending status and borrowing history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Quick Return
          </Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <ArrowLeftRight className="w-4 h-4" />
            New Borrow
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border p-1 rounded-lg shadow-sm">
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="overdue" className="text-destructive">Overdue Alerts</TabsTrigger>
          <TabsTrigger value="history">Return History</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Book & Member</TableHead>
                  <TableHead>Lending Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-accent/30">
                    <TableCell className="font-mono text-xs font-bold text-muted-foreground">{tx.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{tx.book}</span>
                        <span className="text-xs text-muted-foreground">{tx.member}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-xs space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>Borrowed: <span className="font-medium">{tx.borrowDate}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className={cn("w-3 h-3", tx.status === 'Overdue' ? 'text-destructive' : 'text-muted-foreground')} />
                          <span>Due: <span className={cn("font-medium", tx.status === 'Overdue' ? 'text-destructive' : '')}>{tx.dueDate}</span></span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "font-medium",
                          tx.status === "Borrowed" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          tx.status === "Returned" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          "bg-rose-100 text-rose-700 hover:bg-rose-100"
                        )}
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5 h-8">
                        Details
                        <ExternalLink className="w-3 h-3" />
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