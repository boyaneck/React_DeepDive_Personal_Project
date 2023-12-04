import React from "react";
import { useState } from "react";
import store from "redux/config/configStore";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateAuth } from "redux/modules/authSlice";
import styled from "styled-components";

const PROFILE_BOX = styled.div`
  background-color: #ccc;
  border: 1px solid black;
  height: 60vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PROFILE_TEXT = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Profile = () => {
  const storedData = JSON.parse(localStorage.getItem("loginData"));
  console.log("아바타", storedData.avatar);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const handleProifleUpdate = () => {
    setEditing(true);
  };
  const handleCancelUpdate = () => {
    setEditing(false);
  };
  const handleCompleteUpdate = () => {
    dispatch(updateAuth);
    setEditing(false);
  };
  console.log("storedDAta", storedData.nickname);
  return (
    <div>
      {editing ? (
        <PROFILE_BOX>
          <PROFILE_TEXT>프로필 관리</PROFILE_TEXT>
          <div style={{ border: "1px solid black" }}>
            <img src={storedData.avatar} />
          </div>
          <textarea
            name=""
            id=""
            defaultValue={storedData.nickname}
            cols="30"
            rows="10"
          ></textarea>
          <button onClick={handleCancelUpdate}>취소하기</button>
          <button onClick={handleCompleteUpdate}>수정완료</button>
        </PROFILE_BOX>
      ) : (
        <PROFILE_BOX>
          <PROFILE_TEXT>프로필 관리</PROFILE_TEXT>
          <img src="" />
          <div>{storedData.avatar}</div>
          <div>{storedData.nickname}</div>
          <div>{storedData.id}</div>
          <button onClick={handleProifleUpdate}>수정하기</button>
        </PROFILE_BOX>
      )}
    </div>
  );
};

export default Profile;
