import axios from "axios";

const baseUrl = "https://findit.p-e.kr:8443";

export const findSearch = async (visionResponse)=>{
    try{
        const response = await axios.post(`${baseUrl}/api/items/found/advanced-search`, visionResponse)
        return response.data
    }catch(error){
        throw error
    }
  
}