"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Loader2, Book, User, ArrowRight, Zap, Search } from "lucide-react"
import { intelligentBookDiscovery } from "@/ai/flows/intelligent-book-discovery-flow"

type RecommendedBook = {
  title: string
  author: string
  summary: string
}

export default function DiscoveryPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<RecommendedBook[]>([])

  const handleDiscovery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await intelligentBookDiscovery({ naturalLanguageQuery: query })
      setResults(response.recommendedBooks)
    } catch (error) {
      console.error("Discovery error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-12 animate-in-up max-w-5xl mx-auto py-10">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-primary/20">
          <Zap className="w-4 h-4 fill-primary" />
          Quantum Discovery Engine
        </div>
        <h1 className="text-6xl font-bold font-headline text-white tracking-tight leading-tight">
          Find anything, <br /><span className="text-white/40">even if you forgot the title.</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium">
          Our advanced AI librarian understands context, themes, and nuances. Just describe what you're looking for.
        </p>
      </div>

      <form onSubmit={handleDiscovery} className="relative max-w-3xl mx-auto">
        <div className="absolute -inset-1 gradient-primary blur-2xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
        <div className="relative flex items-center">
          <Search className="absolute left-6 w-6 h-6 text-white/20" />
          <Input 
            placeholder="e.g., 'A melancholic story about memory loss in a neon-drenched Tokyo'..." 
            className="h-20 pl-16 pr-40 text-xl glass-card rounded-[28px] border-white/10 focus:border-primary transition-all text-white placeholder:text-white/10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="absolute right-3 h-14 px-8 rounded-2xl gradient-primary font-bold shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "SEARCH AI"}
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="grid gap-8 pt-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">Top Matches</h2>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((book, i) => (
              <Card key={i} className="glass-card border-none rounded-[32px] overflow-hidden group hover:scale-[1.05] transition-all duration-500">
                <div className="p-8 space-y-6 flex flex-col h-full">
                  <div className="space-y-2 flex-1">
                    <div className="p-3 w-fit gradient-secondary rounded-2xl shadow-lg mb-4">
                      <Book className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline text-white leading-tight group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="text-white/40 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                      <User className="w-3 h-3 text-secondary" />
                      {book.author}
                    </p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-sm text-white/60 leading-relaxed italic line-clamp-4">
                    "{book.summary}"
                  </div>
                  <Button variant="ghost" className="w-full justify-between h-12 rounded-xl bg-white/5 hover:bg-primary transition-all font-bold group">
                    LOCATE IN CATALOG
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-10">
          {[
            { label: "Cozy mystery in a tiny library", icon: Sparkles },
            { label: "Hard sci-fi about Dyson Spheres", icon: Book },
            { label: "Poetic essays about architecture", icon: User }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[32px] border-dashed border-white/10 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto transition-transform group-hover:rotate-12">
                <item.icon className="w-6 h-6 text-white/30" />
              </div>
              <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
