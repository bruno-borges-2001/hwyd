import { $notebooks } from "@/atoms/notebooks";
import { Notebook } from "@/types";
import { getRandomColor } from "@/utils/colors";
import { useStore } from "@nanostores/react";
import moment from "moment";
import { createContext, useContext, useMemo } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { v4 } from 'uuid';

type UpdateActionCallback<T> = (prev: T) => T

type DataContextType = {
  notebooks: Notebook[]

  currentNotebook: Notebook | null
  setCurrentNotebookId: (newValue: string | null) => void

  createNotebook: (value?: Omit<Notebook, 'id'>) => void,
  updateNotebook: (id: string, value: Notebook | UpdateActionCallback<Notebook>) => void
  removeNotebook: (id: string) => void

  exportNotebook: (id: string) => string | undefined
}

const DataContext = createContext({} as DataContextType)

export function DataContextProvider({ children }: { children: React.ReactNode }) {
  const notebooks = useStore($notebooks)

  const [currentNotebookId, setCurrentNotebookId] = useQueryParam("id", withDefault(StringParam, null))

  const currentNotebook = useMemo(() => {
    return notebooks?.find((el) => el.id === currentNotebookId) || null
  }, [notebooks, currentNotebookId])

  const createNotebook = (value?: Omit<Notebook, 'id'>) => {
    const newNotebook: Notebook = {
      id: v4(),
      title: 'Test',
      lastUpdatedAt: moment().format(),
      color: getRandomColor([notebooks.at(-1)?.color ?? ""]),
      ...(value ?? {})
    }

    $notebooks.set([...notebooks, newNotebook])
  }

  const updateNotebook = (id: string, value: Notebook | UpdateActionCallback<Notebook>) => {
    const notebookIdx = notebooks.findIndex(n => n.id === id)

    if (notebookIdx < 0) return

    $notebooks.set(
      notebooks.with(
        notebookIdx,
        typeof value === 'function' ? value(notebooks[notebookIdx]) : value
      )
    )
  }

  const removeNotebook = (id: string) => {
    $notebooks.set(notebooks.filter(n => n.id !== id))
  }

  const exportNotebook = (id: string) => {
    const notebook = notebooks.find(n => n.id === id)

    if (!notebook) return;

    const { id: _, lastUpdatedAt, ...rest } = notebook;

    return JSON.stringify(rest, null, 2)
  }

  return (
    <DataContext.Provider value={{
      notebooks,
      currentNotebook,
      setCurrentNotebookId,
      createNotebook,
      updateNotebook,
      removeNotebook,
      exportNotebook
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default function useDataContext() {
  return useContext(DataContext)
}