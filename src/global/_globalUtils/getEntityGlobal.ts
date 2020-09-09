import {
  GlobalEntityState,
  GlobalEntityStateKeys
} from "../InitialGlobalState";
import { getGlobal } from "./useGlobal";

export const getEntityGlobal = <Type extends Partial<GlobalEntityStateKeys>>(
  state: Partial<{ [key in Type]: boolean }>,
  id: string
) => {
  return Object.keys(state).reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: (getGlobal() as any)[`${curr}.${id}`]
    };
  }, {}) as { [key in Type]: GlobalEntityState[key] };
};
