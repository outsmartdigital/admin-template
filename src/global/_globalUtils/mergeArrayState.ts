import { getGlobal } from "./useGlobal";
import {
  GlobalEntityState,
  GlobalEntityStateKeys,
  InitialGlobalEntityState
} from "../InitialGlobalState";

const getEmptyMergeArrayEntityStateResult = () =>
  Object.keys(InitialGlobalEntityState).reduce((acc, key) => {
    return {
      ...acc,
      [key]: {}
    };
  }, {} as { [key in GlobalEntityStateKeys]: any });

export const mergeArrayEntityState = <
  ArrayType,
  Type extends Partial<GlobalEntityStateKeys>
>(
  arrayInput: ArrayType[],
  extractor: {
    [key in Type]: (
      item: ArrayType,
      accumulated: { [key in Type]: Partial<GlobalEntityState[key]> }
    ) => { id: string; entity: Partial<GlobalEntityState[key]> };
  },
  existingGlobal = {}
) => {
  const output: {
    [key in Type]: {
      entities: Partial<GlobalEntityState>;
      ids: string[];
    };
  } = getEmptyMergeArrayEntityStateResult();
  arrayInput.forEach(entity => {
    const entries = Object.entries(extractor);
    entries.forEach(([entityKey, singleExtractor]) => {
      // @ts-ignore
      const result = singleExtractor && singleExtractor(entity);
      const stateKey = `${entityKey}.${result.id}`;
      const global = (getGlobal() as any)[stateKey] || {};
      const assignedState = result.entity || {};
      let newState: any;
      if (Array.isArray(assignedState)) {
        // @ts-ignore
        newState = [
          ...((output[entityKey].entities || {})[stateKey] || []),
          ...assignedState
        ];
      } else {
        newState = {
          ...global,
          // @ts-ignore
          ...(existingGlobal[stateKey] || {}),
          ...assignedState
        };
      }
      // @ts-ignore
      output[entityKey].entities = {
        // @ts-ignore
        ...(output[entityKey].entities || {}),
        [stateKey]: newState
      };
      // @ts-ignore
      output[entityKey].ids = [...(output[entityKey].ids || []), result.id];
    });
  });
  return output;
};
