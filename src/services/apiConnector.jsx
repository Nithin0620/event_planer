import axios from "axios"

export const apiConnector = (method,url,bodyData,headers,params)=>{
   return axios({
      method:method,
      url:url,
      data:bodyData||null,
      headers:headers||null,
      params:params||null,
   })
}