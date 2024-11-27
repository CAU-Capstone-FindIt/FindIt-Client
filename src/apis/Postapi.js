import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// const postFindItem = async (newItem) => {
//   try {
//     const response = await axios.post(
//       "http://findit.p-e.kr:8080/api/items/found",
//       newItem
//     );
//     return response.data;
//   } catch (error) {
//     console.error("데이터 등록 실패:", error);
//     throw error;
//   }
// };

// export const usePostFindItem = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: postFindItem,
//     onSuccess: () => {
//       // 성공적으로 데이터를 등록한 후 findlist를 재조회
//       queryClient.invalidateQueries(["findlist"]);
//     },
//   });
// };

// Form.jsx에서 report모드에 맞게 apiUrl을 동적으로 가져온다.
const postFindItem = async ({ apiUrl, data }) => {
  const accessToken = localStorage.getItem("access");

  console.log(apiUrl);
  console.log(data);

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { apiUrl, ...response.data };
  } catch (error) {
    console.error("데이터 등록 실패:", error);
    throw error;
  }
};

export const usePostFindItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFindItem,
    onSuccess: ({ apiUrl }) => {
      // apiUrl에 따라 해당하는 리스트를 재조회
      if (apiUrl === "http://findit.p-e.kr:8080/api/items/lost/register") {
        queryClient.invalidateQueries(["lostlist"]); // findlist 데이터 새로고침
      } else if (
        apiUrl === "http://findit.p-e.kr:8080/api/items/found/report"
      ) {
        queryClient.invalidateQueries(["findlist"]); // lostlist 데이터 새로고침
      }
    },
  });
};
