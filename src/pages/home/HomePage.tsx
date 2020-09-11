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
  const name: string = "Darth Vader";
  return (
    <>
      <HomeContainer>
        {/* Um exemplo como podemos usar o componente FormatedMessage com variáveis */}
        <FormattedMessage
          id="greeting"
          description="A greeting message"
          defaultMessage={`Olá, mundo! Eu sou o ${name}`}
          values={{ userName: name }}
        />
      </HomeContainer>
    </>
  );
};

export default injectIntl(HomePage);
