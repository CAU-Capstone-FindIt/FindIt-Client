import axios from "axios";

const baseUrl = "https://findit.p-e.kr:8443";

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

export const setNickName = async(nickname) => {
  try{
    const response = await axios.patch(`${baseUrl}/api/users/me`,null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        nickname: nickname, // Query parameter로 전달
      },
    })
    console.log(response)
    return response.data
  }catch(error){
    console.log(error)
    throw error

  }
}

export const setPoint = async(point) => {
  try{
    const response = await axios.patch(`${baseUrl}/api/users/points`, null,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        points: point,
      },
    })
    console.log(response)
    return response.data
  }catch(error){
    console.log(error)
    throw error
  }
}