"use client"

import { useState } from "react"
import { useLibra } from "@/context/libra-context"
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
import { 
  ArrowLeftRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Zap,
  Search,
  Filter,
  User,
  Book,
  Calendar,
  ChevronRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function TransactionsPage() {
  const { transactions, books, members, borrowBook, returnBook } = useLibra()
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [newBorrow, setNewBorrow] = useState({
    memberId: "",
    bookId: "",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })

  const handleBorrow = () => {
    if (!newBorrow.memberId || !newBorrow.bookId) return
    borrowBook(newBorrow.memberId, newBorrow.bookId, newBorrow.dueDate)
    setIsBorrowModalOpen(false)
    setNewBorrow({ memberId: "", bookId: "", dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] })
  }

  const filteredTransactions = transactions.filter(tx => 
    tx.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeLoans = filteredTransactions.filter(tx => tx.status !== "Returned")
  const overdueLoans = filteredTransactions.filter(tx => tx.status === "Overdue")
  const archive = filteredTransactions.filter(tx => tx.status === "Returned")

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
          <Button onClick={() => setIsBorrowModalOpen(true)} className="gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
            <ArrowLeftRight className="w-5 h-5 mr-2" /> DISPATCH ASSET
          </Button>
        </div>
      </div>

      <div className="relative glass-card p-2 rounded-[28px] max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input 
          placeholder="Filter by asset, consignee or ID..." 
          className="pl-14 h-14 bg-transparent border-none text-lg placeholder:text-white/20 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/5 p-2 rounded-[24px] mb-8 h-16 inline-flex no-scrollbar overflow-x-auto">
          <TabsTrigger value="all" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0">ALL FLOWS</TabsTrigger>
          <TabsTrigger value="active" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0">ACTIVE LOANS</TabsTrigger>
          <TabsTrigger value="overdue" className="rounded-2xl px-8 font-bold data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400 h-full transition-all shrink-0">CRITICAL ALERTS</TabsTrigger>
          <TabsTrigger value="history" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0">ARCHIVE</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TransactionTable data={filteredTransactions} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <TransactionTable data={activeLoans} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="overdue" className="mt-0">
          <TransactionTable data={overdueLoans} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <TransactionTable data={archive} onReturn={returnBook} />
        </TabsContent>
      </Tabs>

      {/* Borrow Modal */}
      <Dialog open={isBorrowModalOpen} onOpenChange={setIsBorrowModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold font-headline text-white tracking-tight">Dispatch Asset</DialogTitle>
            <DialogDescription className="text-white/40">Assign a knowledge asset to a registered member.</DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Consignee (Member)</Label>
              <Select onValueChange={(v) => setNewBorrow({ ...newBorrow, memberId: v })}>
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white">
                  <SelectValue placeholder="Select Member" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10 rounded-2xl">
                  {members.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Archive Asset (Book)</Label>
              <Select onValueChange={(v) => setNewBorrow({ ...newBorrow, bookId: v })}>
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white">
                  <SelectValue placeholder="Select Book" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10 rounded-2xl">
                  {books.filter(b => b.availableCopies > 0).map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Expected Return Date</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <Input 
                  type="date"
                  value={newBorrow.dueDate}
                  onChange={(e) => setNewBorrow({ ...newBorrow, dueDate: e.target.value })}
                  className="h-14 pl-12 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                />
              </div>
            </div>
          </div>
          <DialogFooter className="p-8 pt-0 gap-3">
            <Button variant="ghost" onClick={() => setIsBorrowModalOpen(false)} className="h-14 px-8 rounded-2xl text-white/40 hover:text-white">CANCEL</Button>
            <Button onClick={handleBorrow} disabled={!newBorrow.memberId || !newBorrow.bookId} className="h-14 px-10 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] transition-all flex-1">
              CONFIRM DISPATCH
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TransactionTable({ data, onReturn }: { data: any[], onReturn: (id: string) => void }) {
  if (data.length === 0) {
    return (
      <div className="glass-card rounded-[32px] p-20 text-center space-y-6">
        <div className="w-20 h-20 bg-white/5 rounded-[28px] flex items-center justify-center mx-auto">
          <ArrowLeftRight className="w-8 h-8 text-white/10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline text-white tracking-tight">No transmissions recorded</h3>
          <p className="text-white/30 mt-2 font-medium">The selected ledger is currently empty.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
      <Table>
        <TableHeader className="bg-white/5 border-b border-white/5">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Reference</TableHead>
            <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Asset & Consignee</TableHead>
            <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Timeline</TableHead>
            <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
            <TableHead className="text-right h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((tx) => (
            <TableRow key={tx.id} className="hover:bg-white/5 border-white/5 transition-all duration-300 group">
              <TableCell className="py-6 px-8">
                <div className="font-mono text-sm font-bold text-primary tracking-tighter group-hover:scale-110 transition-transform origin-left">{tx.id}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{tx.bookTitle}</span>
                  <span className="text-sm text-white/40 font-medium">{tx.memberName}</span>
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
              <TableCell className="text-right px-8">
                {tx.status !== "Returned" ? (
                  <Button onClick={() => onReturn(tx.id)} variant="outline" size="sm" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-xl font-bold tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all px-4">
                    PROCESS RETURN
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="bg-white/5 border border-white/5 rounded-xl font-bold tracking-widest text-[10px] hover:bg-white/10 group transition-all px-4">
                    INSPECT <ChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
