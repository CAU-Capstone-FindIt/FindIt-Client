import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
    if (error.response.status === 401) {
      console.log(error.response.status);
      alert("게시글을 등록하려면 로그인해주세요");
    }
    throw error;
  }
};

export const usePostFindItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFindItem,
    onSuccess: ({ apiUrl }) => {
      // apiUrl에 따라 해당하는 리스트를 재조회
      if (apiUrl === "http://findit.p-e.kr:8443/api/items/lost/register") {
        queryClient.invalidateQueries(["lostlist"]); // findlist 데이터 새로고침
      } else if (
        apiUrl === "http://findit.p-e.kr:8443/api/items/found/report"
      ) {
        queryClient.invalidateQueries(["findlist"]); // lostlist 데이터 새로고침
      }
    },
  });
};
