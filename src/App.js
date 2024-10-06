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

function App() {
  return (
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
          </Routes>
        </AppDom>
      </ReportProvider>
    </NavProvider>
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
