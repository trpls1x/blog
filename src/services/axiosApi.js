import axios from "axios"
// import store from "@/store"
// import router from "@/router"

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

export default api;
