import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// 예찬이 api연결
export const initializeFindList = async () => {
  try {
    const responseFind = await axios.get(
      "http://findit.p-e.kr:8080/api/items/found/all"
    );

    console.log(responseFind);

    // comments가 배열로 초기화되도록 보장
    // const findlistData = responseFind.data.map((item) => ({
    //   ...item,
    //   comments: item.comments || [], // comments를 빈 배열로 초기화
    // }));

    return responseFind.data;
  } catch (error) {
    console.error(error);
    return []; // 빈 배열을 반환하거나 오류를 처리
  }
};

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
const postFindItem = async ({ apiUrl, formData }) => {
  try {
    const response = await axios.post(apiUrl, formData);
    return response.data;
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
        queryClient.invalidateQueries(["findlist"]); // findlist 데이터 새로고침
      } else if (
        apiUrl === "http://findit.p-e.kr:8080/api/items/found/report"
      ) {
        queryClient.invalidateQueries(["lostlist"]); // lostlist 데이터 새로고침
      }
    },
  });
};
