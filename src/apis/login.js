import axios from "axios";
import { createBrowserHistory } from "history";

const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_KEY;
const REDIRECT_URI1 = "http://localhost:3000/oauth";
const REDIRECT_URI2 = "https://finditcau.netlify.app/oauth";
const kakao_login_uri = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI1}&response_type=code`;

export const loginHandler = () => {
  //localStorage.setItem("access", "key")
  //window.location.href = "/"
  window.location.href = kakao_login_uri;
};

// OAuth 처리를 위한 함수
export const handleOAuth = async () => {
  const history = createBrowserHistory();
  const code = new URL(window.location.href).searchParams.get("code");

  if (code) {
    try {
      const result = await axios.post(
        "https://findit.p-e.kr:8443/api/users/login",
        {
          code: code,
        }
      );

      //console.log(result.data);

      localStorage.setItem("access", result.data.accessToken); // 받아온 액세스 토큰을 로컬스토리지에 저장하여 관리
      //localStorage.setItem("refresh", result.data.refresh_token); // 받아온 리프레시 토큰을 로컬스토리지에 저장하여 관리
      //localStorage.setItem("nickname", result.data.nickname);
      //localStorage.setItem("email", result.data.user.email);
      //localStorage.setItem("profile", result.data.profileImage);

      window.location.href = "/";
    } catch (error) {
      console.error("Error fetching OAuth data", error); // 에러 메세지 확인용
    }
  }
};

// OAuth 처리를 위해 페이지 로드 시 handleOAuth 호출
document.addEventListener("DOMContentLoaded", () => {
  handleOAuth();
});
