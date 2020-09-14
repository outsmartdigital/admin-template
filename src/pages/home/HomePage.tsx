import React from "react";
import styled from "styled-components";
import { getMessages } from "../../constants/messages";
import { useIntl, FormattedMessage } from "react-intl";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  const intl = useIntl();
  const messages = getMessages(intl.locale);
  return (
    <>
      <HomeContainer>
        <FormattedMessage {...messages.greeting} />
      </HomeContainer>
    </>
  );
};

export default HomePage;
