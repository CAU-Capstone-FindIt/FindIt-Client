import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Test = ({ children }) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // 창이 다시 포커스 될 때 쿼리를 자동으로 다시 가져오는 옵션을 비활성화
          refetchOnWindowFocus: true,
          // 쿼리 재시도를 비활성화
          retry: true,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Test;
