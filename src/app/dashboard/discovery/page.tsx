"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, Book, User, ArrowRight } from "lucide-react"
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
    <div className="space-y-8 animate-in-up max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          GenAI Powered
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">Intelligent Discovery</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Can't remember a title? Search by theme, mood, or specific plot points. Our AI librarian will find the perfect match.
        </p>
      </div>

      <form onSubmit={handleDiscovery} className="relative">
        <Input 
          placeholder="e.g., 'A melancholic story set in a dystopian future about lost memories'..." 
          className="h-16 pl-6 pr-32 text-lg shadow-lg border-2 border-muted focus:border-secondary rounded-2xl bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 h-10 px-6 rounded-xl shadow-md"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Discover"}
        </Button>
      </form>

      {results.length > 0 && (
        <div className="grid gap-6">
          <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
            Suggested for you
            <div className="h-px flex-1 bg-border" />
          </h2>
          {results.map((book, i) => (
            <Card key={i} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all group">
              <div className="flex h-full">
                <div className="w-2 bg-secondary" />
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-headline text-primary group-hover:text-secondary transition-colors">{book.title}</h3>
                      <p className="text-muted-foreground flex items-center gap-1.5 text-sm mt-1">
                        <User className="w-3 h-3" />
                        {book.author}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2 group">
                      Find in Catalog
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 text-sm text-foreground/80 leading-relaxed italic border-l-2 border-muted/50">
                    "{book.summary}"
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 opacity-60">
          <div className="bg-white p-6 rounded-xl border border-dashed text-center space-y-2">
            <Book className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="text-xs font-medium">Try 'Space exploration gone wrong'</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-dashed text-center space-y-2">
            <Sparkles className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="text-xs font-medium">Try 'Cozy mystery in a small village'</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-dashed text-center space-y-2">
            <User className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="text-xs font-medium">Try 'Coming of age in the 1920s'</p>
          </div>
        </div>
      )}
    </div>
  )
}