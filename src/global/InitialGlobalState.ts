/**
 * Global State
 * this object represents the initial Global State
 * the global state's type is inferred from this object
 */
import { authState } from "./auth/authState";
import { postEntityState, initialPostState } from "./post/initialPostState";

export const InitialGlobalState = {
  ...authState,
  ...initialPostState
};

export const InitialGlobalEntityState = {
  ...postEntityState
};

export type GlobalState = typeof InitialGlobalState;
export type GlobalEntityState = typeof InitialGlobalEntityState;
export type GlobalEntityStateKeys = keyof GlobalEntityState;
