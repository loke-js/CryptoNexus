import { cn } from '@/lib/utils';
import { CloudFog } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function Logo({
  fontSize = "text-2xl",
  iconSize = 20
}: { fontSize?: string; iconSize?: number }
) {
  return <Link href="/" className={cn("  text-2xl font-extrabold flex items-center justify-center gap-2", fontSize)}>
    <div className="flex justify-center py-4 items-center gap-0.5 pt-5">
      <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">Crypto</span>
      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
        <CloudFog size={iconSize} className='stroke-white' />
      </div>
      <span className='text-stone-700 dark:text-stone-300'>Nexus</span>
    </div>
  </Link>
}

export default Logo
