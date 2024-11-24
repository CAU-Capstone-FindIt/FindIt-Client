import axios from "axios";

const API_KEY = process.env.REACT_APP_VISION_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export const search_gpt = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              `We are currently planning a lost/found item search service.
Your role here will be when the user executes the search function on the service.
The user input values ​​are as follows
1.name
2.brand
3.location
4.color
5.category
6.findLost
7.startDate
8.endDate

Here, you will play the primary role of refining because different users may have slightly different expressions for the same item. If you send the refined data to the server, the service will be provided by searching the server's DB for items similar to the item in question.

So the data and methods you need to clean are as follows
1.name
If input is in Korean, please translate it into English.
In the case of the name, change it to a proper noun as much as possible and the title by which the majority of people call the item. For example, in the case of an Apple laptop, convert it to a MacBook Air, etc.
2.brand
Change the brand to a brand name that is commonly used by the majority of people. If you cannot specify the brand, assign ‘undefined’
3.location
Assign building names or major place names in Korean. If you think it corresponds to the table I am telling you, convert it to the first place name or building name in the parentheses. If not, enter the user input value as is. What is written together in parentheses is the same building and place name.
(아트센터,301,후문빨간벽돌),(체육관,305),(교수연구동, ROTC건물, 306),(법학관, 303),(경영경제관,경경관, 310, 100주년기념관),(창의ICT공학관, 제2공, 제2공학관,  208),(블루미르홀, 기숙사, 긱사, 309, 308),(봅스트홀, 봅홀, 창업보육관, 207, 209, 공대건물),(중앙도서관, 중도, 204),(서라벌홀, 인문대학,  203),(전산정보관, 전산관,  202),(본관, 201), (제1의학관, 제2의학관, 105, 106, 의대), (수림과학관, 자연대, 104), (영신관, 101, 입학처), (파이퍼홀, 간호대학,  103), (약학대학, 약대,  102),(빼빼로 광장, 빼광), (중앙광장, 정문잔디밭, 정문), (운동장, 축구장, 잔디구장), (자이언츠구장, 농구장, 테니스장), (해방광장), (청룡연못, 청룡탕)
4.color
The color of the item must be specified as one of: white, black, gray, red, orange, yellow, green, blue, navy, purple, pink, turquoise, and brown.
5.category”
There are a total of 8 categories of items: electronic devices, precious metals, wallets, bags, clothing, musical instruments, cash, etc. 
   You must choose one of these 8.
6.classification
Assign the matching one among the two find and lost.
7.startDate
No modification required
8.endDate
No modification required

Now the final data format you need to return is as follows:
The value you converted should be on the right.
{
      name: “name”,
      brand: “brand”,
      location: “location”,
      color: “color”,
      category: “category”,
      findLost: “classification”,
      startDate: startDate,
      endDate: endDate,
}
            `.trim(), // 프롬프트
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 200,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;
    console.log(chatResponse);
    return chatResponse;
  } catch (error) {
    console.error("에러", error);
    throw error;
  }
};
