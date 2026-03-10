'use client'


import { useEffect, useState } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  if (!hasHydrated) {
    return <div className="opacity-0">Loading...</div> 
  }

  return <>{children}</>
}