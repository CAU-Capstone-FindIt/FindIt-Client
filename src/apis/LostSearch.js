import axios from "axios";

const baseUrl = "http://findit.p-e.kr:8080";

export const lostSearch = async (visionResponse)=>{
    try{
        const response = await axios.post(`${baseUrl}/api/items/lost/advanced-search`, visionResponse)
        return response.data
    }catch(error){
        throw error
    }
  
}