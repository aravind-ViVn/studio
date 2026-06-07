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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Filter,
  ArrowUpDown,
  Book,
  Download
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", category: "Classic", status: "Available", copies: "5/5" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", category: "Classic", status: "Borrowed", copies: "0/3" },
  { id: "3", title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", category: "Sci-Fi", status: "Available", copies: "2/4" },
  { id: "4", title: "Silent Spring", author: "Rachel Carson", isbn: "978-0618249060", category: "Non-Fiction", status: "Available", copies: "1/1" },
  { id: "5", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", category: "Fantasy", status: "Damaged", copies: "0/2" },
  { id: "6", title: "Educated", author: "Tara Westover", isbn: "978-0399590504", category: "Memoir", status: "Available", copies: "4/4" },
]

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">Inventory</h1>
          <p className="text-white/50 text-lg mt-1 font-medium">Browse and manage the complete LibraFlow collection.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/5 border-white/10 rounded-2xl h-12 px-6 font-bold text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" /> EXPORT PDF
          </Button>
          <Button className="gradient-primary rounded-2xl h-12 px-6 font-bold shadow-lg hover:scale-[1.02] transition-transform">
            <Plus className="w-4 h-4 mr-2" /> ADD NEW BOOK
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center glass-card p-4 rounded-[24px]">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by title, author, or ISBN..." 
            className="pl-12 h-14 bg-white/5 border-white/5 rounded-xl focus:border-primary/50 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge className="h-14 px-6 rounded-xl bg-white/5 text-white/60 border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            FICTION
          </Badge>
          <Badge className="h-14 px-6 rounded-xl bg-white/5 text-white/60 border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            CLASSICS
          </Badge>
          <Button variant="outline" className="h-14 w-14 bg-white/5 border-white/5 rounded-xl p-0 hover:bg-white/10">
            <Filter className="w-5 h-5 text-white/40" />
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[400px] h-16 text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  Title & Author <ArrowUpDown className="w-3 h-3" />
                </button>
              </TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Stock</TableHead>
              <TableHead className="text-right text-white/40 font-bold uppercase tracking-widest text-[10px]">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBooks.map((book) => (
              <TableRow key={book.id} className="hover:bg-white/5 border-white/5 transition-all duration-300">
                <TableCell className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                      <Book className="w-6 h-6 text-white/20" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-lg tracking-tight">{book.title}</span>
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
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
                    book.status === "Available" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    book.status === "Borrowed" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                      book.status === "Available" ? "bg-emerald-400" :
                      book.status === "Borrowed" ? "bg-amber-400" : "bg-rose-400"
                    )} />
                    {book.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                      <span>Available</span>
                      <span>{book.copies}</span>
                    </div>
                    <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary" 
                        style={{ width: `${(parseInt(book.copies.split('/')[0]) / parseInt(book.copies.split('/')[1])) * 100}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10">
                        <MoreHorizontal className="w-5 h-5 text-white/40" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card border-white/10 rounded-2xl p-2 min-w-[180px]">
                      <DropdownMenuLabel className="text-white/40 text-[10px] uppercase font-bold tracking-widest p-2">Management</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl p-3 font-bold hover:bg-white/10 cursor-pointer">Edit Record</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem className="rounded-xl p-3 font-bold text-rose-400 hover:bg-rose-400/10 cursor-pointer">Delete Book</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
