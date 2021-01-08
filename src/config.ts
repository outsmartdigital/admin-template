import { Token } from "typedi";

export const Config = new Token("Config");

export type Config = ReturnType<typeof getConfig>;

export const getConfig = () => {
  assertEnvVarsAreSet([
    ["NEXT_PUBLIC_GRAPHQL_URL", baseConfig.GRAPHQL_URL],
    ["NEXT_PUBLIC_PUBLIC_TOKEN", baseConfig.AUTH_PUBLIC_TOKEN]
  ]);
  return devConfig;
};

const baseConfig = {
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
  AUTH_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_PUBLIC_TOKEN!
};

export const devConfig = {
  ...baseConfig
};

const assertEnvVarsAreSet = (varKeys: Array<[string, string]>) => {
  const missingVars = varKeys.filter(([key, value]) => {
    return !value;
  });
  if (varKeys.length && missingVars.length) {
    throw new Error(`Missing required environment variables: ${missingVars
      .map(([key, value]) => value)
      .join(", ")}. You may need to reset the server
for the changes to take effect.`);
  }
};
