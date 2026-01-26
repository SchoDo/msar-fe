import { MetricResult, MetricQuery, SearchQuery, SearchResult } from '@/types'
import { generateMockResults } from './mockData'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'false'

export async function searchTracks(query: SearchQuery): Promise<SearchResult> {
  // Use mock data if enabled or backend fails
  if (false) {
    console.log('Using mock data')
    return generateMockResults(query.query, query.algorithm, query.k)
  }

  try {
    const response = await fetch(`http://localhost:8000/song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query_text: query.query || "",
        top_k: query.k || 1,
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Backend API failed, falling back to mock data:', error)
    // Fallback to mock data
    return generateMockResults(query.query, query.algorithm, query.k)
  }
}


export async function searchQuery(query: SearchQuery): Promise<SearchResult> {
  // Use mock data if enabled or backend fails
  if (false) {
    console.log('Using mock data')
    return generateMockResults(query.query, query.algorithm, query.k)
  }

  try {
    const response = await fetch(`http://localhost:8000/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query_text: query.query || "V9HVYlU2kekOQ4Bk",
        top_k: query.k,
        type: query.algorithm.split('|')[1] || 'l',
        fusion: query.algorithm.split('|')[0] || "None",
        nn: query.nn || "False"
      }),
    })
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Backend API failed, falling back to mock data:', error)
    // Fallback to mock data
    return generateMockResults(query.query, query.algorithm, query.k)
  }
}

export async function metricQuery(query: MetricQuery): Promise<MetricResult> {
  try {
    const response = await fetch(`http://localhost:8000/metrics_pre`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        k: query.k,
        type: query.algorithm.split('|')[1] || 'l',
        fusion: query.algorithm.split('|')[0] || "None",
        nn: query.nn || "False"
      }),
    })
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Backend API failed, falling back to mock data:', error)
    // Fallback to mock data
    return {
      precision_at_k:-2,
      recall_at_k:-3,
      mrr_at_k:-4,
      ndcg_at_k:-5,
      coverage_at_k:-6,
      pop_at_k:-7
    }
  }
}

export function getYouTubeEmbedUrl(youtubeUrl: string): string {
  // Convert YouTube URL to embed URL
  // https://www.youtube.com/watch?v=XXX -> https://www.youtube.com/embed/XXX
  const videoId = youtubeUrl.split('v=')[1]?.split('&')[0]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl
}