import * as S from "./SignUp.styled";
import { useState } from "react";
import { addSignup } from "redux/modules/signupSlice";
import { useDispatch, useSelector } from "react-redux";
import signupSlice from "redux/modules/signupSlice";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../axios/api";
const SignUp = ({ setSignUpPage }) => {
  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);
  const [pwCheck, setPwCheck] = useState(null);
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const idCheckIsValid= id
  // const pwIsValid;
  // const pwCheckIsValid
  // const nicknameIsValid
  const member = useSelector((state) => state.signupSlice);

  console.log("회원가입 목록:", member);

  const handleCloseSignUpPage = (closeSignUpEvent) => {
    closeSignUpEvent.preventDefault();
    setSignUpPage(false);
  };

  const handleSignUp = (signUpEvent) => {
    signUpEvent.preventDefault();
    dispatch(addSignup({ id, pwCheck, nickname }));
    fetchSignUp();
    navigate("/");
  };

  const body = {
    id: id,
    password: pwCheck,
    nickname,
  };
  const fetchSignUp = async () => {
    const { data } = await api.post("/register", body);
    console.log("회원가입 확인 받기 ", data);
  };
  const onChange = (signUpEvent) => {
    const {
      target: { name, value },
    } = signUpEvent;
    if (name === "id") {
      setId(value);
    }
    if (name === "pw") {
      setPw(value);
    }
    if (name === "pwCheck") {
      setPwCheck(value);
    }
    if (name === "nickname") {
      setNickname(value);
    }
  };

  return (
    <div>
      <S.SIGNUP_BOX>
        <div
          style={{ fontSize: "40px", fontWeight: "bold", margin: "5px 0px" }}
        >
          회원가입
        </div>
        <form>
          <S.INPUT_BOX
            type="text"
            name="id"
            value={id}
            placeholder="아이디를 입력하세요"
            onChange={onChange}
          />
          <S.INPUT_BOX
            type="paswword"
            name="pw"
            value={pw}
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
          />
          <S.INPUT_BOX
            type="text"
            name="pwCheck"
            value={pwCheck}
            placeholder="비밀번호를 재입력하세요"
            onChange={onChange}
          />
          <S.INPUT_BOX
            type="text"
            name="nickname"
            value={nickname}
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
          />
          <S.SIGNUP_BUTTON onClick={handleSignUp}>회원가입</S.SIGNUP_BUTTON>
        </form>
        <S.LOGIN_BUTTON onClick={handleCloseSignUpPage}>
          로그인하기
        </S.LOGIN_BUTTON>
      </S.SIGNUP_BOX>
    </div>
  );
};

export default SignUp;
