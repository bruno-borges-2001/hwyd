import { Toaster } from '@/components/ui/toaster'
import ContextProvider from '@/contexts'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ['latin'] })

export const metadata = {
  title: 'How was your day?',
  description: 'Track your days and how all went',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-background text-primary' style={{ ...roboto.style }}>
        <ContextProvider>
          {children}
        </ContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
