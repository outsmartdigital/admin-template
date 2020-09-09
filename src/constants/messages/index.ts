import { messages_en } from "../strings/translations/en";
import { messages_pt } from "../strings/translations/ptbr";
import detectBrowserLanguage from "detect-browser-language";

let appLanguage = messages_en;

if (typeof window !== "undefined") {
  let browserLanguage = "en";
  if (typeof window !== "undefined") {
    browserLanguage = detectBrowserLanguage();
  }
  const languageWithoutRegion: string = browserLanguage.split(/[-_]/)[0];

  if (languageWithoutRegion === "pt") {
    appLanguage = messages_pt;
  }
}

export const messages = appLanguage;
