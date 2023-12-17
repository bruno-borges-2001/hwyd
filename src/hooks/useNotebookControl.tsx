import { useToast } from "@/components/ui/use-toast"
import useDataContext from "@/contexts/useData"
import moment from "moment"

export default function useNotebookControl(id: string) {
  const {
    setCurrentNotebookId,
    updateNotebook,
    removeNotebook: _removeNotebook,
    exportNotebook: _exportNotebook
  } = useDataContext()

  const { toast } = useToast()

  const openNotebook = () => {
    setCurrentNotebookId(id)

    setTimeout(() => {
      updateNotebook(id, (prev) => ({ ...prev, lastUpdatedAt: moment().format() }))
    }, 1000)

  }

  const closeNotebook = () => {
    setCurrentNotebookId(null)
  }

  const removeNotebook = () => {
    _removeNotebook(id)
  }

  const exportNotebook = () => {
    const notebookString = _exportNotebook(id)

    if (notebookString) {
      navigator.clipboard.writeText(notebookString)

      toast({
        title: "Export Success!",
        description: "Your notebook was exported successfully and was copied to your clipboard"
      })
    } else {
      toast({
        title: "Error!",
        description: "Something wrong happened during the export, please try again later.",
        variant: "destructive"
      })
    }
  }

  return { openNotebook, closeNotebook, removeNotebook, exportNotebook }
}