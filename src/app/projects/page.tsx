import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import LargeHeading from '../components/ui/LargeHeading'
import Paragraph from '../components/ui/Paragraph'
import { PageAnimateWrapper } from '../components/PageAnimateWrapper'



export const metadata: Metadata = {
  title: 'Projects | Krishi Saripalli',
  description: 'About Myself',

}





 const Projects : FC = ({} : any) => {

  return (
    
    <PageAnimateWrapper>
    <div className=' relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='px-3 h-full gap-3 flex flex-col justify-start items-center lg:items-start'>
          <LargeHeading size='sm'
            className='text-black'>Projects</LargeHeading>
            Work in progress...
        </div>
     </div>
  </div>
  </PageAnimateWrapper>


  )
}



  


export default Projects
