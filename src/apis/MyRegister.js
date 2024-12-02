import axios from "axios";

const baseUrl = "http://findit.p-e.kr:8080";

const accessToken = localStorage.getItem("access");

export const myFind = async ()=>{
    try{
        const response = await axios.get(`${baseUrl}/api/items/found/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        console.log(response)
        return response.data
      }catch(error){
        console.log(error)
        throw error
    
      }
}

export const myLost = async ()=>{
    try{
        const response = await axios.get(`${baseUrl}/api/items/lost/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        console.log(response)
        return response.data
      }catch(error){
        console.log(error)
        throw error
    
      }
}