import useDataContext from "@/contexts/useData"
import { motion } from 'framer-motion'
import ImportNotebookDialog from "../ImportNotebookDialog"
import { NotebookFormDialog } from "../NotebookFormDialog"
import { Button } from "./button"

export default function Header() {
  const { currentNotebook, createNotebook } = useDataContext()

  if (currentNotebook) return;

  return (
    <motion.header
      className="w-full max-w-SCREEN h-[60px] flex border-b-2 shadow items-center px-4"
      initial={{ translateY: "-100%" }}
      animate={{ translateY: 0 }}
      exit={{ opacity: 0, translateY: "-100%" }}
      transition={{ type: 'tween' }}
    >
      <motion.div>
        <motion.h1 className="whitespace-nowrap text-2xl font-bold font-serif">How was your day?</motion.h1>
      </motion.div>
      <motion.div className="grow h-full w-full" />
      <motion.div className="flex gap-2">
        <NotebookFormDialog>
          <Button variant="default" className="whitespace-nowrap">
            Create Notebook
          </Button>
        </NotebookFormDialog>
        <ImportNotebookDialog>
          <Button variant="outline" className="whitespace-nowrap">
            Import Notebook
          </Button>
        </ImportNotebookDialog>
      </motion.div>
    </motion.header>
  )
}