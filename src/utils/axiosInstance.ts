import axios from "axios";
const baseUrl = "http://localhost:4000/api/v1";

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

// instance.interceptors.request.use(async (config:InternalAxiosRequestConfig<any>) => {
//   if(!navigator.onLine){
//     return Promise.reject({
//       errorType:CONNECTION_ERROR,
//       netInfo:navigator.onLine
//     });
//   }
//   return config;
// }, (error) => {
//   console.log("Error in inceptor second cb", error);
//   return Promise.reject(error);
// })

export default instance;