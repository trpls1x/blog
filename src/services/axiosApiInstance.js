import axios from "axios"
// import store from "@/store"
// import router from "@/router"

const defaultUrl = process.env.VUE_APP_API_URL;
const prefiks = process.env.VUE_APP_API_PREFIX;

const axiosApiInstance = axios.create({
  baseURL: `${defaultUrl}${prefiks}`,
  headers: {
    'Accept': 'application/json'
  }
})
// создаешь 1 раз инстанс и импортишь
// дальше будет типа axiosApiInstance.post('/users/', payload)
// под капотом и весь дефолт юрл и токен

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(/** succes */(config) => {
  if (localStorage.token) {
    config.headers['Authorization'] = `Bearer ${localStorage.token}`;
  }

  return config;
},
/** podliva */(error) => {
    Promise.reject(error)
})

// было для запросов интерсептор, теперь для ответов,
// вот кстати фишка, тебе нахуй не нужен весь ответ, а только Дата из ответа

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response.data, 
  (error) => {

//     let answerError = ''
//     const originalRequest = error.response

//     if (originalRequest.data.error[0].message) {
//       const resError = {
//         errorMessage: originalRequest.data.error[0].message,
//         status: originalRequest.status
//       }
//       answerError = resError
//     }
  
//     else {
//       const resError = {
//         errorMessage: originalRequest.data.error,
//         status: originalRequest.status
//       }
//       answerError = resError
//     }

//     if (answerError.status === 403 && answerError.errorMessage === "Unauthorized") {
//       console.log(answerError)
//       alert('Problem: "' + answerError.errorMessage + '". Sign In, please')
//       router.push({ name: "Posts" })
//       store.commit("clearCurrentAccountData")
//     }
//
//     return Promise.reject(answerError)
    return Promise.reject(error);
})

export default axiosApiInstance;
