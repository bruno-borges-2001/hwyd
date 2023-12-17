import useDataContext from "@/contexts/useData"
import { motion } from 'framer-motion'
import ImportNotebookDialog from "../ImportNotebookDialog"
import { Button } from "./button"

export default function Header() {
  const { createNotebook } = useDataContext()

  return (
    <motion.header
      className="w-full max-w-SCREEN h-[60px] flex border-b-2 shadow items-center px-4"
      initial={{ translateY: "-100%" }}
      animate={{ translateY: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div>
        <motion.h1 className="whitespace-nowrap text-2xl font-bold font-serif">How was your day?</motion.h1>
      </motion.div>
      <motion.div className="grow h-full w-full" />
      <motion.div className="flex gap-2">
        <Button onClick={createNotebook} variant="default" className="whitespace-nowrap">
          Create Notebook
        </Button>
        <ImportNotebookDialog>
          <Button variant="outline" className="whitespace-nowrap">
            Import Notebook
          </Button>
        </ImportNotebookDialog>
      </motion.div>
    </motion.header>
  )
}