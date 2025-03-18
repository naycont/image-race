interface ImageSrc {
  original: string
  large2x: string
  large: string
  medium: string
  small: string
  portrait: string
  landscape: string
  tiny: string
}

interface Photo {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: ImageSrc
  liked: boolean
  alt: string
}
export interface QueryParams {
  query: string
  per_page: number
}

export interface ImagesResponse {
  page: number
  per_page: number
  photos: Array<Photo>
  total_results: number
  next_page: string
}
