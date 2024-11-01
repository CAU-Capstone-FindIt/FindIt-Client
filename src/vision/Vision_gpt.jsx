import axios from 'axios';

const API_KEY = process.env.REACT_APP_VISION_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

const sendMessageToChatGPT = async (message) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: "You are an assistant that analyzes images to identify item name, category, color, keywords, and brand in the given order." // 프롬프트
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: "image_url",
                                image_url: {
                                    url : `data:image/jpeg;base64,${message}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 200,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const chatResponse = response.data.choices[0].message.content;
        console.log('gpi 응답', chatResponse);
        return chatResponse;
    } catch (error) {
        console.error('에러', error);
        throw error;
    }
};

export default sendMessageToChatGPT;