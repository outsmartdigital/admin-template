import {
  BaseContext,
  NextComponentType,
  NextPageContext
} from "next/dist/next-server/lib/utils";
import { ComponentType } from "react";
import { GlobalState } from "../../global/InitialGlobalState";
import { SetGlobal } from "../../global/_globalUtils/useGlobal";
import { ContainerInstance } from "typedi";

export type PageComponent<P = {}, IP = P> = NextComponentType<
  EnhancedNextPageContext,
  IP,
  P
>;

export type EnhancedNextPageContext = NextPageContext & {
  getGlobal: () => GlobalState;
  setGlobal: SetGlobal;
  container: ContainerInstance;
};

export declare type EnhancedNextComponentType<
  C extends BaseContext = EnhancedNextPageContext,
  IP = {},
  P = {}
> = ComponentType<P> & {
  getInitialProps?(context: C): IP | Promise<IP>;
};

export type GetInitialProps<PageProps> = (
  context: EnhancedNextPageContext
) => PageProps | Promise<PageProps>;
