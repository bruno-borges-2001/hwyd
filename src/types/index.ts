export type Notebook = {
  id: string
  title: string
  author: string
  lastUpdatedAt: string
  color: string,
}

export type NotebookFormFields<T extends keyof Notebook = "id"> = Omit<Notebook, "id" | "lastUpdatedAt" | T>