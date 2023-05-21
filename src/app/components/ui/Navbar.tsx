
import { getServerSession } from 'next-auth'

import Link from 'next/link'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'
import { buttonVariants } from './Button'
import { authOptions } from '@/app/lib/auth'

const Navbar = async () => {
  // const session = await getServerSession(authOptions)

  return (
    <div className='px-5 fixed backdrop-blur-sm bg-white z-50 top-0 left-0 right-0 h-20 border-b border-slate-300  shadow-sm flex items-center justify-between'>
      <div className=' container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className="sm:text-lg md:text-xl">
          Krishi Saripalli
        </Link>

        <div className='flex  gap-4'>
          <Link
            href='/projects'
            className={buttonVariants({ variant: 'ghost' })}>
            Projects
          </Link>
          <Link
            href='/blog'
            className={buttonVariants({ variant: 'ghost' })}>
            Blog
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default Navbar