import { Token } from "typedi";

export const Config = new Token("Config");

export type Config = ReturnType<typeof getConfig>;

export const getConfig = () => {
  return devConfig;
};

export const devConfig = {
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
  AUTH_PUBLIC_TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW0iLCJhdWQiOiJwb3N0Z3JhcGhpbGUiLCJyZWdpc3RyYXRpb24iOjEyMywicm9sZSI6ImNvY2FfY29sYSIsImlhdCI6MTU4NDY0OTUxNCwiZXhwIjoxMDAxNTg0NjQ5NTE0fQ.8dSaehwPZujvHUk4jxV2yyZt7LAYUqVXhNVCS9LhaAQ"
};
