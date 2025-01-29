'use client'

import { useEffect, useRef, useState } from 'react'

import { ReactNode } from 'react';

interface TemplateProps {
  children: ReactNode;
}


//TODO: Figure out how to make this only happen on route change, not on initial load
export default function Template({ children }:  TemplateProps) {
  const [isNewRoute, setIsNewRoute] = useState(false)
  useEffect(() => {

    setIsNewRoute(true)
    const timer = setTimeout(() => {
      setIsNewRoute(false)
    }, 800) //  the duration of the animation in the CSS
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${isNewRoute ? 'animate-fadeInDown' : ''} w-full`}>
      {children}
    </div>
  )
}