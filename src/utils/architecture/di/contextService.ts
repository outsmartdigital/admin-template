import { Token } from "typedi";
import { EnhancedNextPageContext } from "../PageComponent";

export const Context = new Token<Context>("Context");
export type Context = EnhancedNextPageContext;
