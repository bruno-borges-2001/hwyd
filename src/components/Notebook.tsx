import useDataContext from "@/contexts/useData";
import useNotebookControl from "@/hooks/useNotebookControl";
import { motion } from 'framer-motion';
import { Button } from "./ui/button";

export default function Notebook() {
  const { currentNotebook: notebook } = useDataContext()
  const { closeNotebook } = useNotebookControl(notebook?.id ?? "")

  if (!notebook) return null

  return (
    <motion.div
      layoutId={notebook.id}
      className="border-accent rounded flex flex-col gap-4 h-full max-w-full aspect-[3/4] mx-auto items-center justify-center"
      style={{ backgroundColor: notebook.color }}
    >
      <motion.p className="text-5xl font-serif">{notebook.title}</motion.p>
      <Button onClick={closeNotebook}>Close Notebook</Button>
    </motion.div>
  )
}