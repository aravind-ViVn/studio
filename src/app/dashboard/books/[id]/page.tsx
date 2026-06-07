"use client"

import { useLibra } from "@/context/libra-context"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Book as BookIcon, 
  Calendar, 
  Hash, 
  Layers, 
  Clock, 
  User, 
  Edit2, 
  Share2, 
  History,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function BookDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { books, transactions } = useLibra()
  
  const book = books.find(b => b.id === params.id)
  const bookHistory = transactions.filter(t => t.bookId === params.id)

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <AlertCircle className="w-16 h-16 text-rose-500/50" />
        <h2 className="text-3xl font-bold text-white">Asset not found</h2>
        <Button onClick={() => router.back()} variant="outline">RETURN TO CATALOG</Button>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex items-center gap-4">
        <Button onClick={() => router.back()} variant="ghost" className="h-12 w-12 rounded-xl bg-white/5 hover:bg-white/10">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-white tracking-tight">Asset Profiler</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">ID: {book.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Book Info */}
        <div className="lg:col-span-2 space-y-10">
          <div className="glass-card rounded-[40px] p-10 flex flex-col md:flex-row gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 blur-[80px] -z-10" />
            
            <div className="w-full md:w-64 h-96 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl shrink-0 group hover:border-primary/50 transition-all duration-500">
              <BookIcon className="w-20 h-20 text-white/10 group-hover:text-primary/20 transition-colors" />
            </div>

            <div className="flex-1 space-y-8">
              <div className="space-y-2">
                <Badge className={cn(
                  "rounded-full px-4 py-1.5 font-bold text-[10px] tracking-[0.2em] uppercase",
                  book.status === "Available" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                )}>
                  {book.status}
                </Badge>
                <h2 className="text-5xl font-bold font-headline text-white leading-tight tracking-tight">{book.title}</h2>
                <div className="flex items-center gap-3 text-white/50 text-xl font-medium">
                  <User className="w-5 h-5 text-secondary" />
                  {book.author}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Archive ISBN</p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Hash className="w-3.5 h-3.5 text-primary" />
                    {book.isbn}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Asset Category</p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Layers className="w-3.5 h-3.5 text-secondary" />
                    {book.category}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Release Cycle</p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {book.publishYear}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 italic text-white/60 leading-relaxed">
                "{book.summary || "No description available for this knowledge asset in the current archive."}"
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 h-14 rounded-2xl gradient-primary font-bold shadow-xl">
                  <Edit2 className="w-4 h-4 mr-2" /> MODIFY RECORD
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-2xl bg-white/5 border-white/10">
                  <Share2 className="w-5 h-5 text-white/40" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <History className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold font-headline text-white tracking-tight">Transmission History</h3>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="glass-card rounded-[32px] overflow-hidden">
              {bookHistory.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {bookHistory.map((tx, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                          tx.status === 'Returned' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                        )}>
                          {tx.status === 'Returned' ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Clock className="w-6 h-6 text-amber-400" />}
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{tx.memberName}</p>
                          <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">
                            Dispatched: {tx.borrowDate} • {tx.status === 'Returned' ? `Returned: ${tx.returnDate}` : `Due: ${tx.dueDate}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-xl px-4 py-2 font-bold text-[10px] tracking-widest",
                        tx.status === 'Returned' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'
                      )}>
                        {tx.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center space-y-4">
                  <History className="w-12 h-12 text-white/5 mx-auto" />
                  <p className="text-white/30 font-medium italic">No transmission logs detected for this asset.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status/Stock */}
        <div className="space-y-8">
          <div className="glass-card rounded-[32px] p-8 space-y-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 gradient-secondary" />
            <h4 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Stock Inventory</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-4xl font-bold font-headline text-white">{book.availableCopies}</span>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">AVAILABLE UNITS</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-1 text-right">
                <span className="text-4xl font-bold font-headline text-white/40">{book.totalCopies}</span>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">TOTAL CAPACITY</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                <div 
                  className="h-full gradient-secondary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-white/30 uppercase tracking-tighter px-1">
                <span>DEPLETED</span>
                <span>OPTIMAL</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-14 rounded-2xl bg-white/5 border-white/10 hover:bg-primary transition-all font-bold">
              UPDATE STOCK LEVELS
            </Button>
          </div>

          <div className="glass-card rounded-[32px] p-8 space-y-6">
            <h4 className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Active Consignee</h4>
            {book.status === "Borrowed" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-secondary flex items-center justify-center font-bold text-white shadow-lg">
                    {transactions.find(t => t.bookId === book.id && t.status !== 'Returned')?.memberName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {transactions.find(t => t.bookId === book.id && t.status !== 'Returned')?.memberName}
                    </p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Member Link Active</p>
                  </div>
                </div>
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Expected: {transactions.find(t => t.bookId === book.id && t.status !== 'Returned')?.dueDate}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500/20 mx-auto" />
                <p className="text-white/30 text-sm font-medium italic">Asset is currently dormant in archive.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
