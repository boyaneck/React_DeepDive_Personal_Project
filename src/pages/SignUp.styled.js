import styled from "styled-components";

export const INPUT_BOX = styled.input`
  padding: 10px;
  border-radius: 7px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;
  border: 2px solid #ccc;

  &::placeholder {
    color: #ccc;
  }
`;
export const SIGNUP_BOX = styled.div`
  border-radius: 7px;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 450px;
  transform: translate(-50%, -50%);
`;

export const SIGNUP_BUTTON = styled.button`
  padding: 7px;
  width: 100%;
  margin: 20px 0px;
  align-items: center;
  border-radius: 7px;
  border: none;
  display: flex;
  justify-content: center;
  &:hover {
    border: 0.5px solid #ccc;
    cursor: pointer;
    font-weight: bold;
  }
`;
export const LOGIN_BUTTON = styled.button`
  padding: 7px;
  margin: 0 auto;
  align-items: center;
  border-radius: 7px;
  border: none;
  display: flex;
  &:hover {
    border: 0.5px solid #ccc;
    cursor: pointer;
    font-weight: bold;
  }
`;
