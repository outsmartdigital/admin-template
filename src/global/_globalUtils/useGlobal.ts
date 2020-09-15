import {
  getGlobal as getGlobalReactN,
  setGlobal as setGlobalReactN,
  useGlobal as useGlobalReactN
} from "reactn";
import {
  GlobalEntityState,
  GlobalEntityStateKeys,
  GlobalState
} from "../InitialGlobalState";

/**
 * Use Global from React N. Use this to subscribe to a simple state
 */
export const useGlobal = useGlobalReactN;

/**
 * Use global entity. Use this hook when you need to subscribe to changes in a nested entity state
 * @param state
 * @param id
 */
export const useGlobalEntity = <Type extends GlobalEntityStateKeys>(
  state: Partial<{ [key in Type]: boolean }>,
  id: string
) => {
  const keys = Object.keys(state);
  if (keys.length > 1) {
    throw new Error("useGlobalEntity accepts a single entity as configuration");
  }
  const entityKey = keys[0];
  const [global, setGlobal] = useGlobal(`${entityKey}.${id}` as any);
  const proxySetGlobal = (state: GlobalEntityState[Type]) =>
    setGlobal({ [`${entityKey}.${id}`]: state });
  return ([global, proxySetGlobal] as any) as [
    GlobalEntityState[Type],
    (state: GlobalEntityState[Type]) => void
  ];
};

export type GlobalNestedStateSetGlobal<T extends GlobalEntityStateKeys> = {
  entity: T;
  entityId: string;
} & Partial<GlobalEntityState[T]>;

export type SetGlobal = <T extends GlobalEntityStateKeys>(
  state: Partial<GlobalState> & Partial<GlobalEntityState>
) => Promise<GlobalState>;

export const setGlobal: SetGlobal = state => {
  return setGlobalReactN(state);
};

export const getGlobal = getGlobalReactN;
