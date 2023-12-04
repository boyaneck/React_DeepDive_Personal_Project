import React, { useState } from "react";
import styled from "styled-components";
import SignUp from "./SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, dispath, useDispatch } from "react-redux";
import { updateAuth } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import * as S from "./Login.styled";
import api from "../axios/api";
import { __getLetters } from "redux/modules/lettersSlice";
import { useEffect } from "react";

const LOGIN_BOX = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VALID_RIGHT = styled.div`
  width: 100%;
  color: blue;
`;
const VALID_WRONG = styled.div`
  color: red;
`;
// -----------styled.components-----------

const Login = () => {
  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);
  const [signUpPage, setSignUpPage] = useState(false);
  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") {
      setId(value);
      setValidId(value.length >= 4 && value.length <= 10);
    } else if (name === "pw") {
      setPw(value);
      setValidPw(value.length >= 6 && value.length <= 15);
    }
  };

  const navigate = useNavigate();
  const authentication = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const HandleSignUp = (singUpEvent) => {
    singUpEvent.preventDefault();
    setSignUpPage(true);
  };

  const [inputFocused, setInputFocused] = useState(null);
  const handleInputFocus = (focusedInput) => {
    setInputFocused(focusedInput);
  };

  const handleInputblur = (bluredInput) => {
    setInputFocused(null);
  };

  const user = useSelector((state) => state.signupSlice);
  const userNickname = user[0]?.nickname;
  // console.log(" user[0].nickname:", user[0]?.nickname);

  const body = {
    id,
    password: pw,
  };

  const HandleLogin = async (LoginEvent) => {
    LoginEvent.preventDefault();
    try {
      const { data } = await api.post(`/login?expiresIn=30m`, body);

      const localStorageData = {
        accessToken: data?.accessToken,
        id,
        password: pw,
        nickname: data.nickname,
        avatar: "",
      };
      localStorage.setItem("loginData", JSON.stringify(localStorageData));

      dispatch(
        updateAuth({ authenticated: data?.accessToken, id, pw, userNickname })
      );
      alert("로그인이 성공하였습니다!");
      navigate("/home");
    } catch (error) {
      // 에러 발생 시 처리
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  // // 참이면 foucsedIdIsValid 에 true 값 반환
  const foucsedIdIsValid =
    inputFocused === "id" && id?.length >= 4 && id?.length <= 10;
  // //참이면 foucsedPwIsValid 에 true 값 반환
  const focusedPwIsvalid =
    inputFocused === "pw" && pw?.length >= 6 && pw?.length <= 15;
  return (
    <div style={{ background: "#ccc" }}>
      <LOGIN_BOX>
        <S.FORM_TAG>
          <div style={{ fontSize: "40px", fontWeight: "bold" }}>로그인</div>
          <S.INPUT_BOX
            type="text"
            placeholder="아이디는 글자수는 4 ~10 사이로 입력해주세요"
            name="id"
            value={id}
            maxLength={10}
            onChange={onChange}
            onFocus={() => handleInputFocus("id")}
            onBlur={() => handleInputblur(null)}
          />
          {foucsedIdIsValid ? (
            foucsedIdIsValid ? (
              <VALID_RIGHT>아이디가 올바르게 작성되었습니다</VALID_RIGHT>
            ) : (
              <VALID_WRONG>아이디 형식에 맞지 않습니다</VALID_WRONG>
            )
          ) : null}
          <S.INPUT_BOX
            type="password"
            name="pw"
            placeholder="비밀번호는 4 ~ 15 글자로 입력해주세요"
            value={pw}
            maxLength={15}
            onChange={onChange}
            onFocus={() => handleInputFocus("pw")}
            onBlur={() => handleInputblur(null)}
          />
          {focusedPwIsvalid ? (
            focusedPwIsvalid ? (
              <VALID_RIGHT>비밀번호가 올바르게 작성되었습니다.</VALID_RIGHT>
            ) : (
              <VALID_WRONG>비밀번호 형식에 맞지 않습니다</VALID_WRONG>
            )
          ) : null}
          {/* <VALID_RIGHT>비밀번호가 올바르게 작성되었습니다.</VALID_RIGHT> */}
          <S.LOGIN_BUTTON
            type="button"
            onClick={HandleLogin}
            disabled={!validId || !validPw}
          >
            로그인
          </S.LOGIN_BUTTON>
          <S.SIGNUP_BUTTON
            style={{ alignItems: "center" }}
            onClick={HandleSignUp}
          >
            회원가입
          </S.SIGNUP_BUTTON>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
          />
          {signUpPage && <SignUp setSignUpPage={setSignUpPage} />}
        </S.FORM_TAG>
      </LOGIN_BOX>
    </div>
  );
};

export default Login;
