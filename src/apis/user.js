import axios from "axios";

const baseUrl = "http://findit.p-e.kr:8080";

const accessToken = localStorage.getItem("access");

export const getUserInfo = async ()=>{
    try{
        const response = await axios.get(`${baseUrl}/api/users/me`,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        return response.data
    }catch(error){
        throw error
    }
  
}