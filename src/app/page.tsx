'use client'

import IndexPage from "@/pages/IndexPage"
import NotebookPage from "@/pages/NotebookPage"

export default function Home() {
  return (
    <main className="flex flex-col max-h-[100dvh] overflow-hidden">
      <IndexPage />
      <NotebookPage />
    </main>
  )
}
