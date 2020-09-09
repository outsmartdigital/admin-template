import {
  GlobalEntityState,
  GlobalEntityStateKeys
} from "../InitialGlobalState";
import { getGlobal } from "./useGlobal";

export const mergeEntityState = <Input, Type extends GlobalEntityStateKeys>(
  input: Input,
  extractor: {
    [key in Type]: (
      item: Input,
      oldItem?: GlobalEntityState[key]
    ) => { id: string; entity: Partial<GlobalEntityState[key]> };
  }
) => {
  const keys = Object.keys(extractor);
  return keys.reduce((acc, key) => {
    const { id, entity } = extractor[key as Type](input);
    const stateKey = `${key}.${id}`;
    return {
      ...acc,
      ...(getGlobal() as any)[stateKey],
      [stateKey]: entity
    };
  }, {} as any);
};
