import ApolloClient from "apollo-boost";
import { Token } from "typedi";

export type GraphqlClient = ApolloClient<any>;
export const GraphqlClient = new Token<GraphqlClient>("GraphqlClient");
