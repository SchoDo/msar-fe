'use client'

import { RetrievalAlgorithm } from '@/types'

interface AlgorithmSelectorProps {
  selected: RetrievalAlgorithm
  onChange: (algorithm: RetrievalAlgorithm) => void
  k: number
  onKChange: (k: number) => void
  nn: string
  onNNChange: (nn: string) => void
}

const ALGORITHMS: { value: RetrievalAlgorithm; label: string }[] = [
  { value: 'None|Rand', label: 'Random baseline'},
  { value: 'None|l', label: 'Lyrics-based' },
  { value: 'None|a', label: 'Audio-based' },
  { value: 'None|v', label: 'Video-based' },
  { value: 'e|la', label: 'Early Fusion - Lyrics Audio' },
  { value: 'e|lv', label: 'Early Fusion - Lyrics Video' },
  { value: 'e|av', label: 'Early Fusion - Audio Video' },
  { value: 'e|lav', label: 'Early Fusion - Lyrics Audio Video' },
  { value: 'l|la', label: 'Late Fusion - Lyrics Audio' },
  { value: 'l|lv', label: 'Late Fusion - Lyrics Video' },
  { value: 'l|av', label: 'Late Fusion - Audio Video' },
  { value: 'l|lav', label: 'Late Fusion - Lyrics Audio Video' },
]

export function AlgorithmSelector({
  selected,
  onChange,
  k,
  onKChange,
  nn,
  onNNChange
}: AlgorithmSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Retrieval Algorithm
        </label>
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as RetrievalAlgorithm)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
        >
          {ALGORITHMS.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
      </div>
            <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Neural Network
        </label>
        <select
          value={nn}
          onChange={(e) => onNNChange(String(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
        >
          {["True", "False"].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Number of Results (k)
        </label>
        <select
          value={k}
          onChange={(e) => onKChange(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
        >
          {[5, 10, 20, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
