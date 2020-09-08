import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { messages_en } from "../../constants/strings/translations/en";

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
  return (
    <HomeContainer>
      <FormattedMessage
        id="greeting"
        defaultMessage="Hello, World!"
        description="A greeting message"
      />
    </HomeContainer>
  );
};
