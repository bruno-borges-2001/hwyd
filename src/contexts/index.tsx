'use client'

import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
import { DataContextProvider } from './useData';

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <DataContextProvider>
        {children}
      </DataContextProvider>
    </QueryParamProvider>
  )
}