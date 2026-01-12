"use client"
import { initializeTrustedTypes } from '../lib/security/trusted-types'
import { useEffect } from 'react'

export default function TrustedTypesProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  useEffect(() => {
    initializeTrustedTypes()
  }, [])
  
  return <>{children}</>
}