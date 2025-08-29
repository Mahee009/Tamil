import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Tamil } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const notoTamil = Noto_Sans_Tamil({
  weight: ["400", "500", "600", "700"],
  subsets: ["tamil"],
  display: "swap",
  variable: "--font-tamil",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ta" className={`${inter.variable} ${notoTamil.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
