import NotebookButton from "@/components/NotebookButton"
import Header from "@/components/ui/header"
import useDataContext from "@/contexts/useData"
import MainLayout from "@/layouts/main"
import { AnimatePresence, motion } from 'framer-motion'

export default function IndexPage() {
  const { notebooks, currentNotebook } = useDataContext()

  return (
    <AnimatePresence>
      <MainLayout className={currentNotebook ? "opacity-0 -z-10" : ""}>
        <Header />

        <motion.div className="flex flex-col px-8 gap-2 py-4">
          {notebooks.map(notebook => <NotebookButton key={notebook.id} notebook={notebook} />)}
        </motion.div>
      </MainLayout>
    </AnimatePresence>
  )
}