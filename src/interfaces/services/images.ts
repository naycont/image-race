export interface ErrorResponse {
  error: string
}

export interface QueryParams {
  query: string
  per_page: number
}

export interface Photo {
  id: number
  width: number
  height: number
  url: string
  alt: string | null
  avg_color: string | null
  photographer: string
  photographer_url: string
  photographer_id: number | string
  liked: boolean
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
}
export interface ImagesResponse {
  url?: string
  page: string | number
  per_page: string | number
  photos: Photo[]
  total_results: number
  next_page: string | number
}
