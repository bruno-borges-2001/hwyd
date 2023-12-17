'use client'

import Notebook from "@/components/Notebook"
import MainLayout from "@/layouts/main"
import IndexPage from "@/pages/IndexPage"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  return (
    <main className="flex flex-col max-h-[100dvh] overflow-hidden">
      <AnimatePresence>
        <MainLayout>
          <Notebook />
        </MainLayout>
      </AnimatePresence>

      <IndexPage />
    </main>
  )
}
