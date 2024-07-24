import axios from "axios"
import { baseUrl } from "./baseUrl"


 const request = axios.create({
  baseURL : baseUrl,
  // withCredentials : true,
})


export default request;