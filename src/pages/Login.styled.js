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

export const FORM_TAG = styled.form`
  width: 400px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 50px;
  border-radius: 7px;
`;

export const LOGIN_BUTTON = styled.button`
  padding: 7px;
  margin: 20px 0px;
  width: 100%;
  border-radius: 7px;
  border: none;
  &:hover {
    border: 0.5px solid #ccc;
    cursor: pointer;
    font-weight: bold;
  }
`;
export const SIGNUP_BUTTON = styled.button`
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
