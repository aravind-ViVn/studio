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
  MoreVertical, 
  Filter,
  ArrowUpDown
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
    <div className="space-y-6 animate-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Book Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage and track your library inventory.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Add New Book
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, author, or ISBN..." 
            className="pl-10 bg-white border-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-white gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[300px]">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  Title & Author <ArrowUpDown className="w-3 h-3" />
                </button>
              </TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBooks.map((book) => (
              <TableRow key={book.id} className="hover:bg-accent/30 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary">{book.title}</span>
                    <span className="text-xs text-muted-foreground">{book.author}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal bg-muted/20">
                    {book.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-medium",
                      book.status === "Available" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                      book.status === "Borrowed" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                      "bg-rose-100 text-rose-700 hover:bg-rose-100"
                    )}
                  >
                    {book.status}
                  </Badge>
                </TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Book</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Book</DropdownMenuItem>
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