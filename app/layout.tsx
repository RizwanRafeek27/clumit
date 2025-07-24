import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/contexts/theme-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Campus Connect - Find Your Community",
  description:
    "Discover and join student clubs at your university. Connect with like-minded students and build lasting relationships.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
