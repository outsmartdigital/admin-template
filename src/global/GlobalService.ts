import { ContainerInstance, Token } from "typedi";
import { getGlobal, setGlobal } from "reactn";

import {
  GlobalEntityState,
  GlobalEntityStateKeys,
  GlobalState
} from "./InitialGlobalState";
import { SetGlobal } from "./_globalUtils/useGlobal";
import { checkIfServer } from "../utils/checkIfServer";
import { Context } from "../utils/architecture/di/contextService";
import { buildGetGlobalEntity } from "./_globalUtils/getGlobalEntity";

export const GlobalService = new Token("GlobalService");

export type GlobalService = {
  getGlobal: () => GlobalState;
  setGlobal: SetGlobal;
  getGlobalEntity: <Type extends Partial<GlobalEntityStateKeys>>(
    state: Partial<{ [key in Type]: boolean }>,
    id: string
  ) => { [key in Type]: GlobalEntityState[key] };
};

export const getGlobalService = (container: ContainerInstance) => {
  if (!checkIfServer()) {
    return {
      getGlobal,
      setGlobal,
      getGlobalEntity: buildGetGlobalEntity(getGlobal)
    };
  }
  const context = container.get(Context);
  return {
    getGlobal: context.getGlobal as typeof getGlobal,
    setGlobal: context.setGlobal as typeof setGlobal,
    getGlobalEntity: buildGetGlobalEntity(context.getGlobal)
  };
};
