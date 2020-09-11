import React from "react";
import styled from "styled-components";
import { messages } from "../../constants/messages";
import { FormattedMessage, injectIntl } from "react-intl";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = props => {
  const { intl } = props;
  return (
    <>
      <HomeContainer>
        <FormattedMessage {...messages[intl.locale].greeting} />
      </HomeContainer>
    </>
  );
};

export default injectIntl(HomePage);
