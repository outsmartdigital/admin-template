import "reactn";
import { GlobalState } from "./InitialGlobalState";

declare module "reactn/default" {
  export interface State extends GlobalState {}
}
