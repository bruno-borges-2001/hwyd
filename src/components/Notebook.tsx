import useNotebookControl from '@/hooks/useNotebookControl';
import { Notebook as NotebookType } from '@/types';
import { Page as FramerPage } from 'framer';
import { motion } from 'framer-motion';
import { useState } from "react";

import CaretLeft from '@/assets/left-caret.svg';
import Return from '@/assets/return.svg';
import CaretRight from '@/assets/right-caret.svg';
import { cn } from '@/utils';
import Image from 'next/image';
import Page from './Page';
import { Button } from './ui/button';
import Indicator from './ui/indicator';

const pages = [0, 1, 2, 3, 4, 5, 6]

const buttonContainerClasses = 'grow grid place-items-center h-full absolute z-10 md:static transition-all group'

export default function Notebook({ notebook }: { notebook: NotebookType }) {
  const { closeNotebook } = useNotebookControl(notebook.id)

  const [current, setCurrent] = useState(0)

  return (
    <>
      <Button
        variant='none'
        size='none'
        behaviour='scale'
        onClick={closeNotebook}
        className='z-50 absolute top-4 left-4 flex items-center gap-3 transition-transform text-xl hover:scale-110'
      >
        <Image src={Return} alt='close notebook' />
        <span className='hidden lg:block'>Close Notebook</span>
      </Button>

      <motion.div className='h-full flex justify-between max-h-[100dvh] relative'>

        <div className={cn(buttonContainerClasses, "left-0")}>
          <Button
            variant='icon'
            size='none'
            behaviour='scale'
            disabled={current === 0}
            onClick={() => setCurrent(prev => prev > 0 ? prev - 1 : prev)}
          >
            <Image src={CaretLeft} alt='previous page' />
          </Button>
        </div>

        <motion.div
          className='h-full max-w-full aspect-[3/4] relative max-h-[100dvh] mx-auto'
        >
          <FramerPage
            width={"100%"}
            height={"100%"}
            currentPage={current}
            onChangePage={(current) => setCurrent(current)}
          >
            {pages.map((_, index) => {
              return <Page key={index} index={index} />
            })}
          </FramerPage>

          <Indicator
            items={pages}
            current={current}
            changeIndex={setCurrent}
            className='absolute inset-x-0 top-full pt-3'
          />
        </motion.div>

        <div className={cn(buttonContainerClasses, "right-0")}>
          <Button
            variant='icon'
            size='none'
            behaviour='scale'
            disabled={current === pages.length - 1}
            onClick={() => setCurrent(prev => prev < pages.length - 1 ? prev + 1 : prev)}
          >
            <Image src={CaretRight} alt='next page' />
          </Button>
        </div>
      </motion.div>
    </>
  )
}