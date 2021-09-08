import axios from "axios"
import router from "@/router"

const defaultUrl = process.env.VUE_APP_API_URL;
const prefix = process.env.VUE_APP_API_PREFIX;

const api = axios.create({
  baseURL: `${defaultUrl}${prefix}`,
  headers: {
    'Accept': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers['Authorization'] = `Bearer ${localStorage.token}`;
  }
  return config;
},
(error) => {
    Promise.reject(error)
})


api.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    const response = error.response
    if(response.status == 400 && response.data.error == 'Email must be uniq') {
      alert('User with this email already exists')
    } else if(response.status == 403 && response.data.error == 'Unauthorized') {
      alert('Please sing in to complete this action')
    } else if(response.status == 404 && response.data.error == 'No such post'){
      router.push('/post-not-found')
    }
    return Promise.reject(error);
  }
)

export default api;
