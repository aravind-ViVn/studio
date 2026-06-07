"use client"

import { useState, useEffect } from "react"
import { useLibra } from "@/context/libra-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book } from "@/lib/types"

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  book?: Book
}

export function BookModal({ isOpen, onClose, book }: BookModalProps) {
  const { addBook, updateBook } = useLibra()
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: "",
    author: "",
    isbn: "",
    category: "Fiction",
    status: "Available",
    publishYear: new Date().getFullYear(),
    availableCopies: 1,
    totalCopies: 1
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        category: book.category,
        status: book.status,
        publishYear: book.publishYear,
        availableCopies: book.availableCopies,
        totalCopies: book.totalCopies
      })
    } else {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "Fiction",
        status: "Available",
        publishYear: new Date().getFullYear(),
        availableCopies: 1,
        totalCopies: 1
      })
    }
  }, [book, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (book) {
      updateBook(book.id, formData)
    } else {
      addBook(formData)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/10 rounded-[32px] sm:max-w-[600px] p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-8 bg-white/5 border-b border-white/5">
          <DialogTitle className="text-3xl font-bold font-headline text-white tracking-tight">
            {book ? "Edit Record" : "New Archive Entry"}
          </DialogTitle>
          <DialogDescription className="text-white/40">
            {book ? "Modify existing library asset data." : "Add a new knowledge asset to the LibraFlow database."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Asset Title</Label>
              <Input 
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="The Great Gatsby"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Primary Author</Label>
              <Input 
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="F. Scott Fitzgerald"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">ISBN-13</Label>
              <Input 
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                placeholder="978-XXXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(v) => setFormData({ ...formData, category: v })}
              >
                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl text-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10 rounded-2xl">
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                  <SelectItem value="Classic">Classic</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-1">Total Stock</Label>
              <Input 
                type="number"
                value={formData.totalCopies}
                onChange={(e) => setFormData({ ...formData, totalCopies: parseInt(e.target.value) || 0, availableCopies: parseInt(e.target.value) || 0 })}
                className="h-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 text-white" 
                min="0"
                required
              />
            </div>
          </div>
          <DialogFooter className="pt-6 border-t border-white/5 gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="h-14 px-8 rounded-2xl text-white/40 hover:text-white hover:bg-white/5">DISCARD</Button>
            <Button type="submit" className="h-14 px-10 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] transition-all">
              {book ? "SAVE CHANGES" : "PUBLISH TO ARCHIVE"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
