import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLostListQuery = () => {
  return useQuery({
    queryKey: ["lostlist"],
    queryFn: () => initializeLostList(),
    initialData: undefined,

    staleTime: 10000, // 데이터를 1분(60초) 동안 유지
  });
};

// const initializeLostList = async () => {
//   // api로 데이터 가져오기

//   try {
//     const responseFind = await axios.get("http://localhost:3001/lostlist");

//     console.log(responseFind);

//     return responseFind.data;
//   } catch {}
// };

const initializeLostList = async () => {
  try {
    const responseFind = await axios.get(
      "https://findit.p-e.kr:8443/api/items/lost/all"
    );

    console.log(responseFind);

    return responseFind.data;
  } catch (error) {
    console.error(error);
    return []; // 빈 배열을 반환하거나 오류를 처리
  }
};
