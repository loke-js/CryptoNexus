

import { Loader2Icon } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <div className='h-screen flex items-center justify-center'>
        <Loader2Icon size={20} className='stroke-primary animate-spin'/>
    </div>
  )
}
