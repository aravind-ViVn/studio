"use client"

import { useSearchParams } from "next/navigation"
import { useLibra } from "@/context/libra-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book as BookIcon, Users, ArrowLeftRight, Search as SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GlobalSearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ""
  const { searchAll } = useLibra()
  
  const results = searchAll(query)
  const totalCount = results.books.length + results.members.length + results.transactions.length

  return (
    <div className="space-y-10 animate-in-up">
      <div className="flex items-center gap-6">
        <div className="p-4 gradient-primary rounded-[24px] shadow-2xl">
          <SearchIcon className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold font-headline text-white tracking-tight">System Search</h1>
          <p className="text-white/50 text-lg mt-1 font-medium italic">Found {totalCount} relevant entities for "{query}"</p>
        </div>
      </div>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="bg-white/5 border border-white/5 p-2 rounded-[24px] mb-8 h-16 inline-flex">
          <TabsTrigger value="books" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">
            BOOKS ({results.books.length})
          </TabsTrigger>
          <TabsTrigger value="members" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">
            MEMBERS ({results.members.length})
          </TabsTrigger>
          <TabsTrigger value="transactions" className="rounded-2xl px-8 font-bold data-[state=active]:bg-white/10 data-[state=active]:text-white h-full transition-all">
            OPERATIONS ({results.transactions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.books.map(book => (
              <div key={book.id} className="glass-card p-6 rounded-[32px] hover:scale-[1.02] transition-all group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                    <BookIcon className="w-6 h-6 text-white/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="text-sm text-white/40 font-medium">by {book.author}</p>
                    <Badge variant="outline" className="mt-4 border-white/10 text-[10px] tracking-widest uppercase font-bold text-white/30">{book.category}</Badge>
                  </div>
                </div>
              </div>
            ))}
            {results.books.length === 0 && (
              <div className="col-span-full py-20 glass-card rounded-[32px] text-center italic text-white/20">No matching books discovered.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.members.map(member => (
              <div key={member.id} className="glass-card p-6 rounded-[32px] hover:scale-[1.02] transition-all group">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${member.color}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-sm text-white/40 font-medium">{member.email}</p>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-2">Active Transmission: {member.borrows}</p>
                  </div>
                </div>
              </div>
            ))}
             {results.members.length === 0 && (
              <div className="col-span-full py-20 glass-card rounded-[32px] text-center italic text-white/20">No matching community members found.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="space-y-4">
            {results.transactions.map(tx => (
              <div key={tx.id} className="glass-card p-6 rounded-[28px] hover:bg-white/5 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="font-mono text-primary font-bold text-sm tracking-tighter w-20">{tx.id}</div>
                  <div>
                    <h4 className="font-bold text-white tracking-tight group-hover:text-primary transition-colors">{tx.bookTitle}</h4>
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{tx.memberName}</p>
                  </div>
                </div>
                <Badge className="rounded-xl px-4 py-1.5 border-white/10 bg-white/5 text-[10px] tracking-widest font-bold text-white/40">{tx.status}</Badge>
              </div>
            ))}
             {results.transactions.length === 0 && (
              <div className="py-20 glass-card rounded-[32px] text-center italic text-white/20">No operational logs found.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
