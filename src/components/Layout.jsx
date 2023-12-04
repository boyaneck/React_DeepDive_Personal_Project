import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authSlice from "redux/modules/authSlice";

const HEADER = styled.header`
  font-family: "yg-jalnan";
  display: flex;
  width: 100vw;
  background-color: white;
  padding: 20px;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
  position: fixed;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: #000;
  }
`;
const BUTTON = styled.button`
  background-color: white;
  border: none;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;
export const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const storedData = JSON.parse(localStorage.getItem("loginData"));
  const logut = () => {
    localStorage.removeItem("loginData");
    alert("로그아웃 되었습니다");
    navigate("/");
  };
  return (
    <div>
      {storedData.accessToken && (
        <>
          <HEADER>
            <NavLink to="/home">홈</NavLink>
            <div>
              <NavLink style={{ marginRight: "10px" }} to="profile">
                내 프로필
              </NavLink>
              <BUTTON onClick={logut}>로그아웃</BUTTON>
            </div>
          </HEADER>
          <Outlet />
        </>
      )}

      <div>푸터</div>
    </div>
  );
};
