import React from "react";
import styled from "styled-components";
import { useIntl } from "../../constants/intl/intlHooks";

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

export const HomePage: React.FC<HomePageProps> = () => {
  const [translatedMessage] = useIntl();
  const message = "greeting";
  return <HomeContainer>{translatedMessage(message)}</HomeContainer>;
};
