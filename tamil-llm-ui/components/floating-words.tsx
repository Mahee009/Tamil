"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

type WordSpec = { t: string; x: string; y: string; d?: number }

const WORDS: WordSpec[] = [
  { t: "தமிழ்", x: "10%", y: "15%", d: 0.0 },
  { t: "AI", x: "75%", y: "18%", d: 0.4 },
  { t: "மொழி", x: "20%", y: "65%", d: 0.8 },
  { t: "Chat", x: "68%", y: "60%", d: 0.2 },
  { t: "பேச்சு", x: "40%", y: "25%", d: 0.6 },
  { t: "Learning", x: "12%", y: "78%", d: 0.3 },
  { t: "உரையாடல்", x: "84%", y: "75%", d: 0.7 },
  { t: "LLM", x: "50%", y: "12%", d: 0.5 },
  { t: "விவேகம்", x: "30%", y: "85%", d: 0.1 },
  { t: "Compute", x: "58%", y: "82%", d: 0.9 },
]

export function FloatingWords() {
  // Shuffle-like stable keys for variety
  const items = useMemo(() => WORDS.map((w, i) => ({ ...w, key: `${w.t}-${i}` })), [])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none select-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {items.map((w, i) => (
        <motion.span
          key={w.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: [0.15, 0.4, 0.15], y: [0, -6, 0] }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: w.d ?? 0,
          }}
          style={{ left: w.x, top: w.y }}
          className="absolute text-sm md:text-base lg:text-lg text-[#0f172a]/40"
        >
          {w.t}
        </motion.span>
      ))}
    </motion.div>
  )
}
