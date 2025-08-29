"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Sparkles, Upload } from "lucide-react"

type Result = {
  id: string
  content: string
}

export default function HomePage() {
  const [results, setResults] = useState<Result[]>([])

  function handleGenerate(text: string) {
    if (!text.trim()) return
    const demo: Result = {
      id: crypto.randomUUID(),
      content:
        text.length < 160
          ? `பதில்: ${text}\n\nஇது ஒரு மாதிரி உருவாக்கம். உங்கள் LLM API-யை இணைத்த பின் உண்மையான விளைவு இங்கே தோன்றும்.`
          : `சுருக்கம்:\n${text.slice(0, 140)}…\n\nஇது ஒரு மாதிரி உருவாக்கம். உங்கள் LLM API-யை இணைத்த பின் உண்மையான விளைவு இங்கே தோன்றும்.`,
    }
    setResults((prev) => [demo, ...prev])
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 aurora" />
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 md:py-20">
        <header className="text-center space-y-4 animate-in fade-in slide-up">
          <p className="text-sm md:text-base text-gray-500">AI for Tamil</p>
          <h1 className="text-balance text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Tamil AI — Speak, Learn & Generate
          </h1>
          <p className="text-pretty text-gray-600 max-w-2xl mx-auto">
            Enter a Tamil prompt or upload a .txt file. Clean, modern, and fast — inspired by Mistral’s aesthetic.
          </p>
        </header>

        <div className="mt-8 w-full animate-in fade-in slide-up" style={{ animationDelay: "80ms" }}>
          <PromptForm onGenerate={handleGenerate} />
        </div>

        <section className="mt-10 w-full space-y-4 animate-in fade-in slide-up" style={{ animationDelay: "120ms" }}>
          {results.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {results.map((r, i) => (
                <ResultCard key={r.id} content={r.content} index={i} />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

function PromptForm({ onGenerate }: { onGenerate: (text: string) => void }) {
  const [input, setInput] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function readTextFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ""))
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await readTextFile(file)
      setInput(text)
      setFileName(file.name)
    } catch (err) {
      console.log("[v0] file read error", err)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setIsSubmitting(true)
    // Simulate latency; replace with your API call
    await new Promise((r) => setTimeout(r, 500))
    onGenerate(input)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-2xl border border-gray-200 bg-white shadow-xl">
      <div className="p-4 md:p-6">
        <label htmlFor="prompt" className="sr-only">
          Enter Tamil prompt
        </label>

        <div className="relative">
          {input.trim().length === 0 && (
            <span aria-hidden className="pointer-events-none absolute left-3 top-3 text-violet-500 typing-caret" />
          )}
          <Textarea
            id="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="உங்கள் கேள்வியையோ அல்லது உரையை இங்குச் செலுத்துங்கள்…"
            className="min-h-[140px] resize-y bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-indigo-300"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <label
              htmlFor="file"
              className={cn(
                "inline-flex cursor-pointer items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors shadow-sm",
                "hover:bg-gray-50 active:scale-[0.99]",
              )}
            >
              <input
                id="file"
                type="file"
                accept=".txt,text/plain"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload text file"
              />
              <Upload className="mr-2 h-4 w-4" aria-hidden />
              {fileName ? fileName : "Upload .txt"}
            </label>
            <span className="text-xs text-gray-500">or paste text above</span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !input.trim()}
            className={cn(
              "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-white",
              "bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 transition-all",
              "hover:shadow-lg hover:shadow-pink-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-r-transparent" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

function EmptyState() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-gray-600 shadow-sm">
      Responses will appear here as elegant chat cards.
    </div>
  )
}

function ResultCard({ content, index }: { content: string; index: number }) {
  return (
    <Card
      className="border-gray-200 bg-white shadow-md animate-in fade-in slide-up"
      style={{ animationDelay: `${Math.min(index, 4) * 80}ms` }}
    >
      <CardContent className="p-5">
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-gray-900">{content}</pre>
      </CardContent>
    </Card>
  )
}
