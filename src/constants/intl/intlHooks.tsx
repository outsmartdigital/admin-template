import React from "react";
import { FormattedMessage } from "react-intl";

export const useIntl = () => {
  const translatedMessage = (message: string) => {
    return <FormattedMessage id={message} />;
  };

  return [translatedMessage];
};
