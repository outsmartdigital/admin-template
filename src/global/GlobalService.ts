import { ContainerInstance, Token } from "typedi";
import { getGlobal, setGlobal } from "reactn";

import { GlobalState } from "./InitialGlobalState";
import { SetGlobal } from "./_globalUtils/useGlobal";
import { checkIfServer } from "../utils/checkIfServer";
import { Context } from "../utils/architecture/di/contextService";

export const GlobalService = new Token("GlobalService");

export type GlobalService = {
  getGlobal: () => GlobalState;
  setGlobal: SetGlobal;
};

export const getGlobalService = (container: ContainerInstance) => {
  if (!checkIfServer()) {
    console.log("GetGlobal client");
    return { getGlobal, setGlobal };
  }
  const context = container.get(Context);
  console.log("GetGlobal server");
  return {
    getGlobal: context.getGlobal as typeof getGlobal,
    setGlobal: context.setGlobal as typeof setGlobal
  };
};
