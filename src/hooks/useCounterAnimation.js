import { useState, useEffect, useRef } from 'react'

export const useCounterAnimation = (targetNumber, duration = 2000) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          
          // Extract numeric value from the target
          const numericTarget = parseInt(targetNumber.replace(/\D/g, ''))
          
          let current = 0
          const increment = numericTarget / (duration / 16)
          const interval = setInterval(() => {
            current += increment
            if (current >= numericTarget) {
              setCount(numericTarget)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)

          return () => clearInterval(interval)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [targetNumber, duration])

  return { count, elementRef }
}
