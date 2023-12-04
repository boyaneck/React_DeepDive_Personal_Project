import axios from "axios";

const instance = axios.create({
  baseURL: process.env.JSON_SERVER_URL,
});

// 요청 인터셉터
instance.interceptors.request.use(
  function (config) {
    const loginData = JSON.parse(localStorage.getItem("loginData"));

    // accessToken 확인
    if (loginData && loginData.accessToken) {
      config.headers.Authorization = `Bearer ${loginData.accessToken}`;
      return config;
    } else {
      // accessToken 없음 또는 만료
      // 로그아웃 처리
      localStorage.removeItem("loginData");
      // TODO: 로그아웃 상태 처리 등의 작업 수행
      // 예시: navigate('/logout') 또는 다른 로그아웃 처리 로직
      return Promise.reject(new Error("Access Token is missing or expired"));
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
