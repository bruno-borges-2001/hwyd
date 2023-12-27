import useNotebookControl from "@/hooks/useNotebookControl";
import { Notebook } from "@/types";
import { cn } from "@/utils";
import { motion } from 'framer-motion';
import moment from "moment";
import { Button } from "./ui/button";

export default function NotebookButton({ notebook }: { notebook: Notebook }) {
  const { isOpen, openNotebook, removeNotebook, exportNotebook } = useNotebookControl(notebook.id)

  return (
    <motion.li
      layoutId={notebook.id}
      onClick={openNotebook}
      className={cn("border flex flex-col gap-4 cursor-pointer px-8 py-4 rounded relative", isOpen && "h-[80vh]")}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.9 }}
      style={{ backgroundColor: notebook.color }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, zIndex: 999 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <div>
        <p className="text-3xl font-bold font-serif">{notebook.title}</p>
        {notebook.author && <p className="text-lg font-light">by {notebook.author}</p>}
      </div>
      <p className="text-sm opacity-60">Last Access: {moment(notebook.lastUpdatedAt).fromNow()}</p>

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