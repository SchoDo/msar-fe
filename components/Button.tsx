'use client'

import { Track } from '@/types'

interface ButtonProps {
  onClick: any
  track?: Track
}

export function Button({onClick, track} : ButtonProps) {
    function handleClick() {
        onClick(track?.id)
    }
    return (
        <button onClick={handleClick}><span className="text-sm text-gray-600">Query</span></button>
    )
}