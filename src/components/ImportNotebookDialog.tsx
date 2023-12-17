import useDataContext from "@/contexts/useData";
import { Notebook } from "@/types";
import moment from "moment";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type ImportFieldType = {
  key: keyof Notebook,
  required?: boolean,
  default?: () => any
}

const IMPORT_FIELDS = [
  { key: 'title', required: true },
  { key: 'color', required: false },
  { key: 'lastUpdatedAt', required: false, default: () => moment().format() }
] as ImportFieldType[]

export default function ImportNotebookDialog({ children }: { children: React.ReactNode }) {
  const { createNotebook } = useDataContext()
  const { toast } = useToast()

  const [isDialogOpen, changeDialogState] = useState(false)
  const [notebookJSON, setNotebookJSON] = useState("")

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    try {
      const parsedString = JSON.parse(notebookJSON)

      const importedNotebook = {} as Notebook

      IMPORT_FIELDS.forEach(field => {
        if (field.required && !(field.key in parsedString)) throw new Error("Required Field Mising")

        if (!parsedString[field.key] && !field.default) return

        importedNotebook[field.key] = parsedString[field.key] ?? field.default!()
      })

      createNotebook(importedNotebook)

      setNotebookJSON("")

      changeDialogState(false)
    } catch (e) {
      toast({
        title: 'Uh oh! Something went wrong',
        description: 'The JSON you inserted is invalid, check the text you inserted and try again.',
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={changeDialogState}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            Import Notebook
          </DialogTitle>
          <DialogDescription>
            Paste the exported <strong>Notebook JSON</strong> string below to import a new Notebook
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Textarea
              name="notebookJSON"
              placeholder="Paste your JSON here"
              value={notebookJSON}
              onChange={(e) => setNotebookJSON(e.target.value)}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              Import
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}