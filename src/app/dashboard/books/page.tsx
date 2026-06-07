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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Download,
  Book as BookIcon,
  Edit2,
  Trash2,
  Copy,
  Eye,
  ArrowUpDown,
  CheckCircle2,
  FileText,
  FileSpreadsheet
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { BookModal } from "@/components/modals/book-modal"
import { Book } from "@/lib/types"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export default function CatalogPage() {
  const { books, deleteBook, duplicateBook } = useLibra()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined)

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    
    const matchesCategory = activeCategory ? book.category === activeCategory : true
    
    return matchesSearch && matchesCategory
  })

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingBook(undefined)
    setIsModalOpen(true)
  }

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/books/${id}`)
  }

  const handleExport = (type: string) => {
    toast({
      title: "Export Initiated",
      description: `Ledger being processed as ${type}. Download will start shortly.`,
    })
    setIsExportModalOpen(false)
  }

  const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Classic", "History", "Technology", "Business"]

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Catalog Archive</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Browse and manage the complete LibraFlow collection.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsExportModalOpen(true)} variant="outline" className="bg-white/5 border-white/10 rounded-2xl h-12 px-6 font-bold text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" /> EXPORT LEDGER
          </Button>
          <Button onClick={handleAddNew} className="gradient-primary rounded-2xl h-12 px-6 font-bold shadow-lg hover:scale-[1.02] transition-transform">
            <Plus className="w-4 h-4 mr-2" /> PUBLISH ASSET
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center glass-card p-4 rounded-[24px]">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by title, author, or ISBN..." 
            className="pl-12 h-14 bg-white/5 border-white/5 rounded-xl focus:border-primary/50 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
          <Badge 
            onClick={() => setActiveCategory(null)}
            className={cn(
              "h-14 px-6 rounded-xl cursor-pointer transition-all border border-white/5 shrink-0 uppercase tracking-widest font-bold text-[10px]",
              activeCategory === null 
                ? "bg-primary text-white border-primary" 
                : "bg-white/5 text-white/60 hover:bg-white/10"
            )}
          >
            ALL ASSETS
          </Badge>
          {categories.map(cat => (
            <Badge 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "h-14 px-6 rounded-xl cursor-pointer transition-all border border-white/5 shrink-0 uppercase tracking-widest font-bold text-[10px]",
                activeCategory === cat 
                  ? "bg-primary text-white border-primary" 
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[400px] h-16 text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    Title & Author <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
                <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Stock</TableHead>
                <TableHead className="text-right text-white/40 font-bold uppercase tracking-widest text-[10px] px-8">Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id} className="hover:bg-white/5 border-white/5 transition-all duration-300 group">
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-all">
                        <BookIcon className="w-6 h-6 text-white/20 group-hover:text-primary/40" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleViewDetails(book.id)}>{book.title}</span>
                        <span className="text-sm text-white/40 font-medium">by {book.author}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold bg-white/5 border-white/10 text-white/60 px-3 py-1 rounded-lg">
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]",
                      book.status === "Available" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      book.status === "Borrowed" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", 
                        book.status === "Available" ? "bg-emerald-400 animate-pulse" :
                        book.status === "Borrowed" ? "bg-amber-400" : "bg-rose-400"
                      )} />
                      {book.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                        <span>{book.availableCopies}/{book.totalCopies}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full transition-all duration-500", (book.availableCopies / book.totalCopies) < 0.3 ? "bg-rose-500" : "gradient-primary")} 
                          style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10">
                          <MoreHorizontal className="w-5 h-5 text-white/40" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-white/10 rounded-2xl p-2 min-w-[200px] shadow-2xl">
                        <DropdownMenuLabel className="text-white/40 text-[10px] uppercase font-bold tracking-widest p-2">Operations</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(book.id)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                          View Details <Eye className="w-4 h-4 opacity-30" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(book)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                          Edit Record <Edit2 className="w-4 h-4 opacity-30" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateBook(book.id)} className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer flex items-center justify-between">
                          Duplicate Entry <Copy className="w-4 h-4 opacity-30" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem onClick={() => deleteBook(book.id)} className="rounded-xl p-3 font-bold text-rose-400 hover:bg-rose-400/10 cursor-pointer flex items-center justify-between">
                          Archive Entry <Trash2 className="w-4 h-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="glass-card rounded-[40px] p-20 text-center space-y-8 animate-in-up">
          <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto border border-dashed border-white/20">
            <BookIcon className="w-10 h-10 text-white/10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline text-white tracking-tight">No assets discovered</h2>
            <p className="text-white/30 text-lg max-w-sm mx-auto font-medium">Your search criteria didn't yield any results in the current archive.</p>
          </div>
          <Button variant="outline" onClick={() => { setSearchTerm(""); setActiveCategory(null); }} className="rounded-2xl h-12 px-8 border-white/10 text-white font-bold hover:bg-white/5">
            CLEAR ALL FILTERS
          </Button>
        </div>
      )}

      {/* Export Modal */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[450px] p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold font-headline text-white tracking-tight">Export Ledger</DialogTitle>
            <DialogDescription className="text-white/40">Select your preferred format for the inventory report.</DialogDescription>
          </DialogHeader>
          <div className="p-8 grid grid-cols-1 gap-4">
            <Button onClick={() => handleExport('PDF')} variant="ghost" className="h-20 justify-start gap-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary transition-all group">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:bg-white">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Portable Document Format</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">.PDF Archive</p>
              </div>
            </Button>
            <Button onClick={() => handleExport('CSV')} variant="ghost" className="h-20 justify-start gap-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary transition-all group">
              <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center shadow-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Comma Separated Values</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">.CSV Ledger</p>
              </div>
            </Button>
            <Button onClick={() => handleExport('Excel')} variant="ghost" className="h-20 justify-start gap-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white">Microsoft Excel</p>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">.XLSX Sheet</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={editingBook} 
      />
    </div>
  )
}
