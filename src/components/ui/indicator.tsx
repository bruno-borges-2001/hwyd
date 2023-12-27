import { cn } from '@/utils';
import { motion } from 'framer-motion';

type IndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  current: number
  changeIndex: (index: number) => void;
  items: any[]
}

const indicatorAlpha = 0.3

export default function Indicator({ items, current, changeIndex, className, ...rest }: IndicatorProps) {
  return (
    <div className={cn('flex justify-center gap-3', className)} {...rest}>
      {items.map((_, index) => {
        return (
          <motion.div
            key={"indicator-" + index}
            className='aspect-square h-[10px] rounded-full transition-opacity bg-black cursor-pointer hover:!opacity-75'
            animate={{ opacity: current === index ? 1 : indicatorAlpha }}
            onTap={() => changeIndex(index)}
          />
        )
      })}
    </div>
  )
}