import useDataContext from "@/contexts/useData"
import { Notebook, NotebookFormFields } from "@/types"
import { colors } from "@/utils/colors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

type NotebookFormDialogProps = {
  initialValue?: Partial<Notebook>

  children: React.ReactNode
}

const FormSchema = z.object({
  title: z.string(),
  author: z.string(),
  color: z.string().optional()
})

export function NotebookFormDialog({ children, initialValue }: NotebookFormDialogProps) {

  const { setCurrentNotebookId, createNotebook, updateNotebook } = useDataContext()

  const [isDialogOpen, changeDialogState] = useState(false)

  const form = useForm<NotebookFormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValue
  })

  useEffect(() => {
    if (isDialogOpen) return

    form.reset()
  }, [form, isDialogOpen])

  const onSubmit: SubmitHandler<NotebookFormFields> = (data) => {
    console.log(data)

    if (initialValue && initialValue.id) {
      updateNotebook(initialValue.id, data)
    } else {
      const id = createNotebook(data)

      setCurrentNotebookId(id)

      changeDialogState(false)
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
            {initialValue ? "Edit" : "Create a new"} Notebook
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notebook Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <div className="flex justify-center items-center flex-wrap gap-4">
                      {Object.entries(colors).map(([key, value]) => (
                        <button
                          key={key}
                          value={value}
                          type="button"
                          className="border-2 border-slate-600 h-8 aspect-square rounded-xl cursor-pointer opacity-30 hover:opacity-100 hover:scale-105"
                          style={{ backgroundColor: value, opacity: field.value === value ? 1 : undefined }}
                          onClick={field.onChange}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>The background color for your notebook. Leave it empty for a random color</FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}