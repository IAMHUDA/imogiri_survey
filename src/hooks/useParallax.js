import { useEffect, useRef, useState } from 'react'

export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const elementTop = elementRef.current.getBoundingClientRect().top
        const newOffset = elementTop * speed
        setOffset(newOffset)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return {
    elementRef,
    style: {
      transform: `translateY(${offset}px)`
    }
  }
}
