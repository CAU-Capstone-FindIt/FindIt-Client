import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // 환경변수로 설정하자.
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
                        content: '' // 여기에 프롬프트 작성하기
                    },
                    {
                        role: 'user',
                        content: message // 여기에 내가 보낼 이미지 url 넣으면 될 듯
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
        console.log('ChatGPT의 응답:', chatResponse);
        return chatResponse;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
    }
};

// 사용 예시
sendMessageToChatGPT(); // 여기에 함수 인자로 이미지 url 넣기