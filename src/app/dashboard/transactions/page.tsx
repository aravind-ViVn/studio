"use client"

import { useState } from "react"
import { useLibra } from "@/context/libra-context"
import { useRouter } from "next/navigation"
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
  Zap,
  Search,
  ChevronRight,
  Trash2,
  Download
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export default function TransactionsPage() {
  const { transactions, books, members, borrowBook, returnBook, extendLoan, voidTransaction } = useLibra()
  const router = useRouter()
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isVoidModalOpen, setIsVoidModalOpen] = useState(false)
  const [selectedTx, setSelectedTx] = useState<any>(null)
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

  const handleTxAction = (tx: any) => {
    setSelectedTx(tx)
    setIsDetailsModalOpen(true)
  }

  const handleVoid = () => {
    if (selectedTx) {
      voidTransaction(selectedTx.id)
      setIsVoidModalOpen(false)
      setIsDetailsModalOpen(false)
    }
  }

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Transaction history is being compiled into a CSV report.",
    })
  }

  const filteredTransactions = transactions.filter(tx => 
    tx.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeLoans = filteredTransactions.filter(tx => tx.status !== "Returned")
  const overdueLoans = filteredTransactions.filter(tx => tx.status === "Overdue")
  const returnedArchive = filteredTransactions.filter(tx => tx.status === "Returned")

  return (
    <div className="space-y-6 lg:space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline text-white tracking-tight">Operations Ledger</h1>
          <p className="text-white/50 text-base lg:text-lg mt-1 font-medium font-body">Tracking the flow of knowledge assets.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto bg-white/5 border-white/10 rounded-2xl h-14 px-8 font-bold text-white hover:bg-white/10 transition-all">
            <Download className="w-5 h-5 mr-2" /> EXPORT
          </Button>
          <Button onClick={() => setIsBorrowModalOpen(true)} className="w-full sm:w-auto gradient-primary rounded-2xl h-14 px-8 font-bold shadow-lg hover:scale-[1.02] transition-transform">
            <ArrowLeftRight className="w-5 h-5 mr-2" /> DISPATCH ASSET
          </Button>
        </div>
      </div>

      <div className="relative glass-card p-2 rounded-[28px] max-w-2xl w-full">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input 
          placeholder="Filter by asset, consignee or ID..." 
          className="pl-14 h-14 bg-transparent border-none text-base lg:text-lg placeholder:text-white/20 text-white w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/5 p-1 lg:p-2 rounded-[20px] lg:rounded-[24px] mb-6 lg:mb-8 h-14 lg:h-16 flex overflow-x-auto no-scrollbar scroll-smooth w-full">
          <TabsTrigger value="all" className="flex-1 rounded-xl lg:rounded-2xl px-4 lg:px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0 text-[10px] lg:text-sm">ALL FLOWS</TabsTrigger>
          <TabsTrigger value="active" className="flex-1 rounded-xl lg:rounded-2xl px-4 lg:px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0 text-[10px] lg:text-sm">ACTIVE</TabsTrigger>
          <TabsTrigger value="overdue" className="flex-1 rounded-xl lg:rounded-2xl px-4 lg:px-8 font-bold data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400 h-full transition-all shrink-0 text-[10px] lg:text-sm">CRITICAL</TabsTrigger>
          <TabsTrigger value="history" className="flex-1 rounded-xl lg:rounded-2xl px-4 lg:px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all shrink-0 text-[10px] lg:text-sm">ARCHIVE</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TransactionTable data={filteredTransactions} onAction={handleTxAction} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <TransactionTable data={activeLoans} onAction={handleTxAction} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="overdue" className="mt-0">
          <TransactionTable data={overdueLoans} onAction={handleTxAction} onReturn={returnBook} />
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <TransactionTable data={returnedArchive} onAction={handleTxAction} onReturn={returnBook} />
        </TabsContent>
      </Tabs>

      {/* Borrow Modal */}
      <Dialog open={isBorrowModalOpen} onOpenChange={setIsBorrowModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl m-4">
          <DialogHeader className="p-6 lg:p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-2xl lg:text-3xl font-bold font-headline text-white tracking-tight">Dispatch Asset</DialogTitle>
            <DialogDescription className="text-white/40">Assign an asset to a member.</DialogDescription>
          </DialogHeader>
          <div className="p-6 lg:p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Consignee (Member)</Label>
              <Select onValueChange={(v) => setNewBorrow({ ...newBorrow, memberId: v })}>
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white w-full">
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
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white w-full">
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
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Return Date</Label>
              <Input 
                type="date"
                value={newBorrow.dueDate}
                onChange={(e) => setNewBorrow({ ...newBorrow, dueDate: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl text-white w-full" 
              />
            </div>
          </div>
          <DialogFooter className="p-6 lg:p-8 pt-0 gap-3 flex-col sm:flex-row">
            <Button variant="ghost" onClick={() => setIsBorrowModalOpen(false)} className="h-14 px-8 rounded-2xl text-white/40 hover:text-white w-full sm:w-auto">CANCEL</Button>
            <Button onClick={handleBorrow} disabled={!newBorrow.memberId || !newBorrow.bookId} className="h-14 px-10 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] transition-all flex-1 w-full">
              CONFIRM
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[450px] p-0 overflow-hidden shadow-2xl m-4">
          <DialogHeader className="p-6 lg:p-8 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-primary/20 text-primary border-primary/30 font-bold tracking-widest uppercase text-[10px] px-3 py-1">TRANSACTION LOG</Badge>
              <span className="font-mono text-[10px] text-white/20">{selectedTx?.id}</span>
            </div>
            <DialogTitle className="text-2xl lg:text-3xl font-bold font-headline text-white tracking-tight leading-tight">{selectedTx?.bookTitle}</DialogTitle>
            <DialogDescription className="text-white/40">Details for {selectedTx?.memberName}.</DialogDescription>
          </DialogHeader>
          <div className="p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">DISPATCHED ON</p>
                <p className="text-white font-bold">{selectedTx?.borrowDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">EXPECTED RETURN</p>
                <p className="text-white font-bold">{selectedTx?.dueDate}</p>
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">STATUS</p>
                <Badge className={cn(
                  "mt-1 rounded-xl px-4 py-1.5 font-bold text-xs",
                  selectedTx?.status === 'Borrowed' ? 'bg-primary/10 text-primary' :
                  selectedTx?.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                )}>
                  {selectedTx?.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
              {selectedTx?.status !== 'Returned' && (
                <>
                  <Button onClick={() => { returnBook(selectedTx.id); setIsDetailsModalOpen(false); }} className="w-full h-14 rounded-2xl gradient-primary font-bold shadow-xl">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> PROCESS RETURN
                  </Button>
                  <Button onClick={() => { extendLoan(selectedTx.id, 7); setIsDetailsModalOpen(false); }} variant="outline" className="w-full h-14 rounded-2xl bg-white/5 border-white/10 font-bold">
                    <Clock className="w-4 h-4 mr-2" /> EXTEND (7 DAYS)
                  </Button>
                </>
              )}
              <Button onClick={() => setIsVoidModalOpen(true)} variant="ghost" className="w-full h-12 rounded-xl text-rose-400 hover:bg-rose-400/10 font-bold">
                <Trash2 className="w-4 h-4 mr-2" /> VOID RECORD
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isVoidModalOpen} onOpenChange={setIsVoidModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[400px] p-6 lg:p-10 text-center space-y-6 shadow-2xl m-4">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-500">
            <Trash2 className="w-8 lg:w-10 h-8 lg:h-10" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-xl lg:text-2xl font-bold font-headline text-white">Void Transaction?</DialogTitle>
            <DialogDescription className="text-white/40">This action will permanently remove the record.</DialogDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={() => setIsVoidModalOpen(false)} variant="ghost" className="flex-1 h-12 rounded-xl text-white/40">CANCEL</Button>
            <Button onClick={handleVoid} className="flex-1 h-12 rounded-xl bg-rose-500 hover:bg-rose-600 font-bold">CONFIRM</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function TransactionTable({ data, onAction, onReturn }: { data: any[], onAction: (tx: any) => void, onReturn: (id: string) => void }) {
  if (data.length === 0) {
    return (
      <div className="glass-card rounded-[32px] p-12 lg:p-20 text-center space-y-6 animate-in-up font-body">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/5 rounded-[28px] flex items-center justify-center mx-auto border border-dashed border-white/20">
          <ArrowLeftRight className="w-8 h-8 text-white/10" />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-bold font-headline text-white tracking-tight">No transmissions recorded</h3>
          <p className="text-white/30 mt-2 font-medium max-w-sm mx-auto text-sm lg:text-base">The ledger is empty for this filter.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block glass-card rounded-[32px] overflow-hidden border-none shadow-2xl font-body">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Ref</TableHead>
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
                    <span className="text-sm text-white/40 font-medium">Consignee: {tx.memberName}</span>
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
                      <span className={cn("text-xs font-bold", tx.status === 'Overdue' ? 'text-rose-400' : 'text-white/40')}>
                        {tx.status === 'Returned' ? `IN: ${tx.returnDate}` : `DUE: ${tx.dueDate}`}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-headline",
                    tx.status === "Borrowed" ? "bg-primary/10 text-primary border border-primary/20" :
                    tx.status === "Returned" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  )}>
                    <Zap className="w-3 h-3 fill-current" />
                    {tx.status}
                  </div>
                </TableCell>
                <TableCell className="text-right px-8">
                  <div className="flex items-center justify-end gap-2">
                    {tx.status !== "Returned" ? (
                      <Button onClick={() => onReturn(tx.id)} variant="outline" size="sm" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 rounded-xl font-bold tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all px-4 h-10">
                        RETURN
                      </Button>
                    ) : (
                      <Badge variant="ghost" className="bg-white/5 text-[10px] uppercase font-bold text-white/20 px-3 py-1.5 rounded-lg">ARCHIVED</Badge>
                    )}
                    <Button onClick={() => onAction(tx)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10">
                      <ChevronRight className="w-5 h-5 text-white/30" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {data.map((tx) => (
          <div key={tx.id} className="glass-card p-5 rounded-[24px] space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary shrink-0">{tx.id}</span>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full shrink-0",
                    tx.status === 'Borrowed' ? 'bg-primary animate-pulse' :
                    tx.status === 'Overdue' ? 'bg-rose-500' : 'bg-emerald-500'
                  )} />
                </div>
                <h3 className="font-bold text-white text-lg tracking-tight truncate leading-tight">{tx.bookTitle}</h3>
                <p className="text-xs text-white/40 font-medium truncate">Consignee: {tx.memberName}</p>
              </div>
              <Button onClick={() => onAction(tx)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 shrink-0">
                <ChevronRight className="w-5 h-5 text-white/30" />
              </Button>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-white/30 uppercase tracking-widest">Dispatched</span>
                <span className="text-white/60">{tx.borrowDate}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className={cn("uppercase tracking-widest", tx.status === 'Overdue' ? 'text-rose-400/50' : 'text-white/30')}>
                  {tx.status === 'Returned' ? 'Returned' : 'Due Date'}
                </span>
                <span className={cn(tx.status === 'Overdue' ? 'text-rose-400' : 'text-white/60')}>
                  {tx.status === 'Returned' ? tx.returnDate : tx.dueDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {tx.status !== "Returned" && (
                <Button onClick={() => onReturn(tx.id)} className="flex-1 gradient-primary rounded-xl h-11 font-bold text-[10px] tracking-widest uppercase">
                  PROCESS RETURN
                </Button>
              )}
              <Button variant="outline" onClick={() => onAction(tx)} className="flex-1 bg-white/5 border-white/10 rounded-xl h-11 font-bold text-[10px] tracking-widest uppercase text-white">
                VIEW DETAILS
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
