import axios from 'axios'

const request = axios.create({
  baseURL: String(import.meta.env.VITE_API_URL),
})

request.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return false
  },
  (_err) => {
    return false
  }
)

export default request
