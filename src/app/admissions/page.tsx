import Image from 'next/image'
import LargeHeading from '../components/ui/LargeHeading'
import Paragraph from '../components/ui/Paragraph'
import { Metadata } from 'next'
import { buttonVariants } from '../components/ui/Button'
import Link from 'next/link'
import { PageAnimateWrapper } from '../components/PageAnimateWrapper'




export const metadata: Metadata = {
  title: 'Krishi Saripalli | Admissions Counseling',
  description: 'Tailored Admissions Counseling for Top Schools'

}

export default function Home() {
  return (
    <PageAnimateWrapper>
      <div className=' relative h-screen flex items-center justify-center overflow-x-hidden'>
        <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
          <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
            <LargeHeading size='lg'
            className='text-black'>Set yourself apart in the college admissions process</LargeHeading>
            <Paragraph className='max-w-xl lg:text-left'>
              Refine your essays, fine tune your extracurriculars and
            set yourself up for successs in the college admissions process
            </Paragraph>
            <Link
              href='/documentation'
              className={buttonVariants({ variant: 'default' })}>
              Learn More
            </Link>
            
            <div className='animate-spin-slow opacity-10 relative w-full max-w-xl lg:max-w-2xl lg:left-1/2 aspect-square lg:absolute'>
              <Image
                priority
                className='img-shadow '
                quality={100}
                style={{ objectFit: 'contain' }}
                fill
                src='/circles.png'
                alt='circles'
              />
            </div>
          </div>
        </div>
      </div>
   </PageAnimateWrapper>
  )
}
