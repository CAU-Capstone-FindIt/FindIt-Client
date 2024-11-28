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
  // api로 데이터 가져오기
  const accessToken = localStorage.getItem("access");

  try {
    const responseFind = await axios.get(
      "http://findit.p-e.kr:8080/api/items/lost/all"
    );

    console.log(responseFind);

    return responseFind.data;
  } catch {}
};
