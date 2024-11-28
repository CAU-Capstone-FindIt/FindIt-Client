import axios from "axios";

const API_KEY = process.env.REACT_APP_VISION_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export const vision_gpt = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
This is a service that helps you find lost/found items. 
You need to analyze the photos uploaded by users and compare them to the database to find similar items. 
To make this comparison easier, we will provide guidelines. The items to analyze are:
1. The name of the item
2. The category of the item
3. The color of the item
4. The brand of the item.

Guidelines:
1. For the name of the item, use a common proper noun. 
2. There are a total of 8 categories of items: electronic devices, precious metals, wallets, bags, clothing, musical instruments, cash, etc. 
   You must choose one of these 8.
3. The color of the item must be specified as one of: white, black, gray, red, orange, yellow, green, blue, navy, purple, pink, turquoise, and brown. 
4. If the brand of the item cannot be specified, it must be printed as 'Non'.

Output Format:
{"name" : "", "category" : "", "color" : "", "brand" : ""}

Special Cases:
- If the image is not an item or does not fall into the category of lost/found items, output all field values as 'Non'.
            `.trim(), // 프롬프트
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${message}`,
                },
              },
            ],
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
    const parsedResponse = JSON.parse(chatResponse);
    return parsedResponse;
  } catch (error) {
    console.error("에러", error);
    throw error;
  }
};
