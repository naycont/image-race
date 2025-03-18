import axios from 'axios'

const API_URL: string = import.meta.env.VITE_ALEGRA_API_URL
const API_KEY: string = import.meta.env.VITE_ALEGRA_API_KEY

const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Basic ${API_KEY}`
  }
})

export default http
