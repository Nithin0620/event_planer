import axios from "axios"

export const apiConnector = (method,url,bodyData,headers={},params)=>{

   const token = localStorage.getItem("token");
   const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

   return axios({
      method:method,
      url:url,
      data:bodyData||null,
      headers:{ ...authHeaders, ...headers } || null,
      params:params||null,
      withCredentials:true,
   })
}