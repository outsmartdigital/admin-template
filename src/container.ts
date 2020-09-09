import { ContainerInstance } from "typedi";

import { Config, getConfig } from "./config";
import { getGlobalService, GlobalService } from "./global/GlobalService";
import { ApolloClientFactory } from "./services/_common/graphql/apolloClient";
import { GraphqlClient } from "./services/_common/graphql/graphqlClient";

export const setupContainer = (container: ContainerInstance) => {
  container.set(Config, getConfig());
  container.set(GlobalService, getGlobalService(container));
  container.set(
    GraphqlClient,
    ApolloClientFactory.initializeApolloClient(container)
  );
};
