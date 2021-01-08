import {
  GlobalEntityState,
  GlobalEntityStateKeys
} from "../InitialGlobalState";

export const buildGetGlobalEntity = (getGlobal: any) => <
  Type extends Partial<GlobalEntityStateKeys>
>(
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
