import { createClient } from 'pexels'
import type { QueryParams, ImagesResponse } from '@/interfaces/services/images'

const API_KEY: string = import.meta.env.VITE_IMAGES_API_KEY
const client = createClient(API_KEY)

const imageService = {
  search: async (params: QueryParams) => {
    const { query, per_page } = params
    try {
      const response: ImagesResponse = await client.photos.search({ query, per_page })
      const arrayReponse = response?.photos?.length
        ? response.photos.map(({ id, src }) => {
            return {
              id,
              url: src.original
            }
          })
        : []
      return arrayReponse
    } catch (error) {
      console.error(error)
    }
  }
}
export default imageService
