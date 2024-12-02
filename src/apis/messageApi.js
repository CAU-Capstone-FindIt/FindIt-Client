import axios from "axios";

const baseUrl = "http://findit.p-e.kr:8080";

const accessToken = localStorage.getItem("access");

export const latestMessage = async (id)=>{
    try{
        const response = await axios.get(`${baseUrl}/api/messages/latest-messages`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            userId : id,
          },
        })
        //console.log(response)
        return response.data
      }catch(error){
        console.log(error)
        throw error
    
      }
}

export const sendMessage = async (itemId, itemType, receiverId, message) => {
  try{
    const response = await axios.post(`${baseUrl}/api/messages/${itemId}/message/send`, { content: message },{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        //itemId : itemId,
        itemType : itemType,
        receiverId : receiverId
      },
    })
    console.log(response)
    return response.data
  } catch(error) {
    console.log(error)
    throw error
  }
}

export const getMessage = async (senderId, receiverId) => {
  try{
    const response = await axios.get(`${baseUrl}/api/messages/conversation/between`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        userA : senderId,
        userB : receiverId,
      },
    })
    //console.log(response)
    return response.data
  } catch(error) {
    console.log(error)
    throw error
  }
}