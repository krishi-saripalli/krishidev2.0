
import './globals.css'
import { Inter } from 'next/font/google'
import { classname } from './lib/utils'
import Navbar from './components/ui/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
  
  
}) {
  return (
    <html lang="en" className={classname('bg-white antialiased',inter.className)}>
      <body className=' bg-gradient-to-r from-zinc-700 to-neutral-800 min-h-screen'>
      
          {/* @ts-expect-error Server Component */}
          <Navbar/>
          <main>
            {children}
          </main>
        {/*allow for more height on mobile */}
        {/* <div className='h-40 md:hidden'></div> */}
        <footer className='text-white text-sm py-10 flex justify-center'>Krishi Saripalli 2023</footer>
        
      </body>
    </html>
  )
}
