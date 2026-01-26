export type RetrievalAlgorithm = 
  | 'None|Rand'
  | 'None|l'
  | 'None|a'
  | 'None|v'
  | 'e|la'
  | 'e|lv'
  | 'e|av'
  | 'e|lav'
  | 'l|la'
  | 'l|lv'
  | 'l|av'
  | 'l|lav'
  | 'late_fusion'
  | 'neural_network'

export interface Track {
  id: string
  artist: string
  track: string
  album: string
  genres: string[]
  popularity: number
  similarity?: number
  youtube_url: string
}

export interface SearchResult {
  query_track: Track
  retrieved_tracks: Track[]
  algorithm: RetrievalAlgorithm
  metrics: {
    precision_at_k: number
    recall_at_k: number
    mrr_at_k: number
    ndcg_at_k: number
    coverage_at_k: number
    pop_at_k: number
  }
  k: number
}

export interface MetricResult {
  precision_at_k: number
  recall_at_k: number
  mrr_at_k: number
  ndcg_at_k: number
  coverage_at_k: number
  pop_at_k: number
}

export interface MetricQuery {
  algorithm: RetrievalAlgorithm
  k: number
  nn: string
}

export interface SearchQuery {
  query: string // artist, track, or album name
  algorithm: RetrievalAlgorithm
  nn: string
  k: number // number of results
}
