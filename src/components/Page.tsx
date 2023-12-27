import useDataContext from '@/contexts/useData'
import useNotebookControl from '@/hooks/useNotebookControl'
import { cn } from '@/utils'
import { HTMLMotionProps, motion } from 'framer-motion'
import { Button } from './ui/button'

type PageProps = HTMLMotionProps<"div"> & { index: number }

export default function Page({ index, className, ...rest }: PageProps) {
  const { currentNotebook } = useDataContext()
  const { closeNotebook } = useNotebookControl(currentNotebook!.id)

  if (!currentNotebook) return

  return (
    <motion.div
      layoutId={index === 0 ? currentNotebook.id : currentNotebook.id + '-' + index}
      className={cn("border-accent rounded flex flex-col gap-4 h-full w-full items-center justify-center", className)}
      style={{ backgroundColor: currentNotebook.color }}
      {...rest}
    >
      <motion.p className="text-5xl font-serif">{currentNotebook.title}</motion.p>
      <Button onClick={closeNotebook}>Close Notebook</Button>
    </motion.div>
  )
}