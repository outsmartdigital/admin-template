import {
  GlobalEntityState,
  GlobalEntityStateKeys
} from "../InitialGlobalState";

export const buildEntityState = (
  state: Partial<{ [key in GlobalEntityStateKeys]: GlobalEntityState[key] }>,
  entityId: string
) => {
  return Object.keys(state).reduce((acc, curr) => {
    return {
      ...acc,
      // @ts-ignore
      [`${curr}.${entityId}`]: state[curr]
    };
  }, {}) as Partial<{ [key in GlobalEntityStateKeys]: GlobalEntityState[key] }>;
};
