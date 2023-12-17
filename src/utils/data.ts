import { Notebook } from "@/types"

export function getAll(): Notebook[] {
  const _data = localStorage.getItem('notebooks')

  if (!_data) {
    localStorage.setItem('notebooks', JSON.stringify([]))
    return []
  }

  return JSON.parse(_data)
}

export function getById(id: string): Notebook | undefined {
  const notebooks = getAll()

  return notebooks.find(el => el.id === id)
}

export function update(id: string, value: Notebook) {
  const notebooks = getAll()

  const notebookIdx = notebooks.findIndex(el => el.id === id)

  if (notebookIdx < 0) return

  notebooks[notebookIdx] = value

  localStorage.setItem('notebooks', JSON.stringify(notebooks))
}

export function remove(id: string) {
  const notebooks = getAll()

  localStorage.setItem('notebooks', JSON.stringify(notebooks.filter(el => el.id === id)))
}