import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useFindListQuery = () => {
  return useQuery({
    // "findlist"라는 키를 기반으로 데이터를 캐싱하고 관리하며, 첫 번째 호출 시 지정한 엔드포인트 URL에서 데이터를 가져온다
    queryKey: ["findlist"],
    queryFn: () => initializeFindList(),
    initialData: undefined,

    staleTime: 10000, // 데이터를 1분(60초) 동안 유지
  });
};

// json-server연결
// const initializeFindList = async () => {
//   try {
//     const responseFind = await axios.get("http://localhost:3001/findlist");

//     // comments가 배열로 초기화되도록 보장
//     const findlistData = responseFind.data.map((item) => ({
//       ...item,
//       comments: item.comments || [], // comments를 빈 배열로 초기화
//     }));

//     return findlistData;
//   } catch (error) {
//     console.error(error);
//     return []; // 빈 배열을 반환하거나 오류를 처리
//   }
// };

// 예찬이 api연결
const initializeFindList = async () => {
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

// 댓글 업데이트 함수
export const useUpdateComments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComments,
    onSuccess: () => {
      queryClient.invalidateQueries(["findlist"]); // 업데이트 후 재조회
    },
  });
};

const updateComments = async (id, comments) => {
  try {
    await axios.put(`http://localhost:3001/findlist/${id}`, { comments });
  } catch (error) {
    console.error("댓글 업데이트 실패:", error);
  }
};
