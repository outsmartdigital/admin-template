import React from "react";
import styled from "styled-components";
import { messages } from "../../constants/messages";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HomePage: React.FC = data => {
  return (
    <>
      <HomeContainer>{messages[data.formatedLanguage].greeting}</HomeContainer>
      {console.log(data)}
    </>
  );
};
