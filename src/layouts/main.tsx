import { cn } from "@/utils";
import { HTMLMotionProps, motion } from 'framer-motion';

type MainLayoutProps = HTMLMotionProps<"div">

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <motion.div className={cn("fixed inset-0 overflow-auto transition", className)}>
      {children}
    </motion.div>
  )
}