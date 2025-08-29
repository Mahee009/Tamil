import Link from "next/link"
import { FloatingWords } from "@/components/floating-words"

export default function LandingPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white">
      {/* Background aurora and floating words */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 aurora" />
      <FloatingWords />

      <section className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-16">
        <header className="text-center space-y-5 animate-in fade-in slide-up">
          <p className="text-sm md:text-base text-[#0f172a]/60">AI for Tamil & English</p>
          <h1 className="text-balance text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="gradient-text">Tamil LLM</span>
          </h1>
          <p className="text-pretty max-w-2xl mx-auto text-base md:text-lg text-[#0f172a]/70">
            AI-powered understanding of Tamil & English — minimal, elegant, and fast.
          </p>
        </header>

        <div className="mt-8 animate-in fade-in slide-up" style={{ animationDelay: "100ms" }}>
          <Link
            href="/playground"
            className={[
              "group inline-flex items-center justify-center rounded-full px-6 py-3 text-white",
              "bg-gradient-to-r from-[#7dd3fc] via-[#c4b5fd] to-[#f9a8d4]",
              "transition-all hover:shadow-[0_0_0_8px_rgba(196,181,253,0.15)] hover:brightness-105",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd]/50",
            ].join(" ")}
            aria-label="Try the Tamil LLM playground"
          >
            Try Now
            <span
              aria-hidden
              className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_12px_2px_rgba(255,255,255,0.6)]"
            />
          </Link>
        </div>
      </section>
    </main>
  )
}
