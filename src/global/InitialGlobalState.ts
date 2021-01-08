/**
 * Global State
 * this object represents the initial Global State
 * the global state's type is inferred from this object
 */
import { authState } from "./auth/authState";
import { postEntityState, initialPostState } from "./post/initialPostState";
import { initialUserState, userEntityState } from "./user/initialUserState";

export const InitialGlobalState = {
  ...authState,
  ...initialPostState,
  ...initialUserState
};

export const InitialGlobalEntityState = {
  ...postEntityState,
  ...userEntityState
};

export type GlobalState = typeof InitialGlobalState;
export type GlobalEntityState = typeof InitialGlobalEntityState;
export type GlobalEntityStateKeys = keyof GlobalEntityState;
