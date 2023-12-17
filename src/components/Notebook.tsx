import useDataContext from "@/contexts/useData";
import useNotebookControl from "@/hooks/useNotebookControl";
import { motion } from 'framer-motion';
import { Button } from "./ui/button";

export default function Notebook() {
  const { currentNotebook: notebook } = useDataContext()
  const { closeNotebook } = useNotebookControl(notebook?.id ?? "")

  if (!notebook) return null

  return (
    <motion.div className="border flex flex-col gap-4" layoutId={notebook.id}>
      {notebook.title}
      <Button onClick={closeNotebook}>Close Notebook</Button>
    </motion.div>
  )
}