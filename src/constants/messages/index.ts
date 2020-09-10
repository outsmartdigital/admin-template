import { messages_en } from "../strings/translations/en";
import { messages_pt } from "../strings/translations/ptbr";
import detectBrowserLanguage from "detect-browser-language";
import { checkIfServer } from "../../utils/checkIfServer";

// TODO: pegar a função checkIfServer, que ainda não ta na master

let appLanguage = messages_en;

const isServer = checkIfServer();

let browserLanguage = "en";
if (!isServer) {
  browserLanguage = detectBrowserLanguage();
}
const languageWithoutRegion: string = browserLanguage.split(/[-_]/)[0];

if (languageWithoutRegion === "pt") {
  appLanguage = messages_pt;
}

export const messages = appLanguage;
