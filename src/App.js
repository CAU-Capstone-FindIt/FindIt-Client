import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Home from "./pages/Home";
import styled from "styled-components";
import ReportMode from "./pages/ReportMode";
import Find from "./pages/Find";
import { NavProvider } from "./apis/NavContext";
import Lost from "./pages/Lost";
import { ReportProvider } from "./apis/ReportContext";
import Form from "./pages/Form";
import Detail from "./pages/Detail";
import Test from "./pages/Test";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Userpage from "./pages/userpage/Userpage";
import Bookmark from "./pages/userpage/Bookmark";
import RegisteItem from "./pages/userpage/Registeitem";
import ChargePoint from "./pages/userpage/ChargePoint";
import Message from "./pages/userpage/Message";
import Search from "./pages/search/Search";
import { RecoilRoot } from "recoil";
import MessageDetail from "./pages/userpage/MessageDetail";

function App() {
  return (
    // Test가 QueryClientProvider이다
    <RecoilRoot>
    <Test>
      <NavProvider>
        <ReportProvider>
          <AppDom>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/map" element={<Map></Map>}></Route>
              <Route path="/report" element={<ReportMode></ReportMode>}></Route>
              <Route path="/find" element={<Find></Find>}></Route>
              <Route path="/lost" element={<Lost></Lost>}></Route>
              <Route path="/form" element={<Form></Form>}></Route>
              <Route path="/oauth" element={<div>login...</div>}></Route>
              <Route path="/detail/*" element={<Detail></Detail>}></Route>
              <Route path="/userpage" element={<Userpage></Userpage>}></Route>
              <Route path="/bookmark" element={<Bookmark></Bookmark>}></Route>
              <Route
                path="/registeitem"
                element={<RegisteItem></RegisteItem>}
              ></Route>
              <Route
                path="/chargepoint"
                element={<ChargePoint></ChargePoint>}
              ></Route>
              <Route path="/message" element={<Message></Message>}></Route>
              <Route path="/messageDetail" element={<MessageDetail></MessageDetail>}></Route>
              <Route path="/search" element={<Search></Search>}></Route>
            </Routes>
          </AppDom>
        </ReportProvider>
      </NavProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Test>
    </RecoilRoot>
  );
}

export default App;

const AppDom = styled.div`
  width: min(100vw, 600px); // 화면 너비에 맞추면서 최대 600px로 제한
  height: 100vh; // 웹 뷰
  margin: 0 auto;

  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

// view height 변수 설정
window.addEventListener("resize", () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
