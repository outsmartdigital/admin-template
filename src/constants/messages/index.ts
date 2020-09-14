import { messages_en } from "../strings/translations/en";
import { messages_pt } from "../strings/translations/ptbr";

export const getMessages = (language: string) => {
  let appLanguage = messages_pt;

  switch (language) {
    case "pt":
      appLanguage = messages_pt;
      break;
    case "en":
      appLanguage = messages_en;
      break;
  }
  return appLanguage;
};

// export const messages: object = {
//   en: messages_en,
//   pt: messages_pt
// };
