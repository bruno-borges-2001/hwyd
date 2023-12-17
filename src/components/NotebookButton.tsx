import useNotebookControl from "@/hooks/useNotebookControl";
import { Notebook } from "@/types";
import { motion } from 'framer-motion';
import moment from "moment";
import { Button } from "./ui/button";

export default function NotebookButton({ notebook }: { notebook: Notebook }) {
  const { openNotebook, removeNotebook, exportNotebook } = useNotebookControl(notebook.id)

  return (
    <motion.li
      layoutId={notebook.id}
      onClick={openNotebook}
      className="border flex flex-col gap-4 cursor-pointer px-8 py-3 rounded"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.9 }}
      style={{ backgroundColor: notebook.color }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <motion.p className="text-3xl font-serif">{notebook.title}</motion.p>
      <motion.p className="text-sm opacity-60">Last Access: {moment(notebook.lastUpdatedAt).fromNow()}</motion.p>

      <div className="flex gap-3 self-end">
        <Button
          className="w-20"
          onClick={(e) => {
            e.stopPropagation()
            exportNotebook()
          }}
        >
          Export
        </Button>

        <Button
          className="w-20"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation()
            removeNotebook()
          }}
        >
          Remove
        </Button>
      </div>
    </motion.li>
  )
}