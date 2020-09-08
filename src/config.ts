import { Token } from "typedi";

export const Config = new Token("Config");

export type Config = ReturnType<typeof getConfig>;

export const getConfig = () => {
  return devConfig;
};

export const devConfig = {
  API_URL: "https://api.outsmartyourself.com.br/mock-api"
};
