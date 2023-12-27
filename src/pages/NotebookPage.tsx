import Notebook from "@/components/Notebook";
import useDataContext from "@/contexts/useData";
import MainLayout from "@/layouts/main";
import { AnimatePresence } from "framer-motion";

export default function NotebookPage() {
  const { currentNotebook } = useDataContext()

  if (!currentNotebook) return null

  return (
    <AnimatePresence>
      <MainLayout className="p-8">
        <Notebook notebook={currentNotebook} />
      </MainLayout>
    </AnimatePresence>
  )
}