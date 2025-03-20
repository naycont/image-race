import type { QueryParams, ImagesResponse, ErrorResponse } from '@/interfaces/services/Images'

const API_KEY: string = import.meta.env.VITE_IMAGES_API_KEY
const IMAGE_URL: string = import.meta.env.VITE_IMAGES_URL

const imageService = {
  search: async (params: QueryParams) => {
    const { query, per_page } = params
    try {
      const response: ImagesResponse | ErrorResponse = await fetch(
        `${IMAGE_URL}/search?query=${query}&per_page=${per_page}`,
        {
          headers: {
            Authorization: API_KEY
          }
        }
      ).then((response) => response.json())

      const arrayReponse =
        'photos' in response
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
