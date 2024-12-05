import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";

export const useFindListQuery = () => {
  return useQuery({
    // "findlist"라는 키를 기반으로 데이터를 캐싱하고 관리하며, 첫 번째 호출 시 지정한 엔드포인트 URL에서 데이터를 가져온다
    queryKey: ["findlist"],
    queryFn: () => initializeFindList(),
    initialData: undefined,

    staleTime: 10000, // 데이터를 1분(60초) 동안 유지
    refetchInterval: 30000, // 30초마다 데이터 새로고침
    cashetime: 10000,
  });
};

export const useFindListSuspenseQuery = () => {
  return useSuspenseQuery({
    // "findlist"라는 키를 기반으로 데이터를 캐싱하고 관리하며, 첫 번째 호출 시 지정한 엔드포인트 URL에서 데이터를 가져온다
    queryKey: ["findlist"],
    queryFn: () => initializeFindList(),
    initialData: undefined,

    staleTime: 10000, // 데이터를 1분(60초) 동안 유지
    refetchInterval: 30000, // 30초마다 데이터 새로고침
    cashetime: 10000,
  });
};

// 예찬이 api연결
const initializeFindList = async () => {
  try {
    const responseFind = await axios.get(
      "http://findit.p-e.kr:8443/api/items/found/all"
    );

    console.log(responseFind);

    return responseFind.data;
  } catch (error) {
    console.error(error);
    return []; // 빈 배열을 반환하거나 오류를 처리
  }
};
