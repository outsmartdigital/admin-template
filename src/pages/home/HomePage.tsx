import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface HomePageProps {
  data: string;
}

// export const HomePage: React.FC<HomePageProps> = ({ data }) => {
//   return <HomeContainer>{data}</HomeContainer>;
// };

export const translatedMessage = (message: string) => {
  return <FormattedMessage id={message} />;
};

export const HomePage: React.FC<HomePageProps> = () => {
  return <HomeContainer>{translatedMessage("greeting")}</HomeContainer>;
};
