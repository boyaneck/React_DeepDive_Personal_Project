import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  //요청을 보내기전
  function (config) {
    console.log("인터셉터 요청 성공");
    return config;
  },

  function (error) {
    console.log("인터셉터 오류 ");
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log("인터세터 응답 입니다", response);
    return response;
  },
  function (error) {
    console.log("인터셉터 응답 오류입니다", error);
    return error;
  }
);
export default instance;
