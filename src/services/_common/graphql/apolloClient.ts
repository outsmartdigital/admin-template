import ApolloClient from "apollo-boost";
import { ContainerInstance, Inject } from "typedi";

import { Config } from "../../../config";
import { GlobalService } from "../../../global/GlobalService";

export const getRequestAuthToken = (
  tokenFromGlobal: string | undefined,
  publicToken: string
) => {
  return `Bearer ${tokenFromGlobal || publicToken}`;
};

export class ApolloClientFactory {
  @Inject(Config)
  config: Config;

  @Inject(GlobalService)
  global: GlobalService;

  static initializeApolloClient(container: ContainerInstance) {
    const factory = container.get(ApolloClientFactory);
    return factory.getClient();
  }

  public getClient() {
    const client = new ApolloClient({
      uri: this.config.GRAPHQL_URL,
      onError(input) {
        if (input.graphQLErrors) {
          console.warn(input.graphQLErrors);
        }
        if (input.networkError) {
          console.warn(input.networkError);
        }
      },
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: getRequestAuthToken(
              undefined,
              this.config.AUTH_PUBLIC_TOKEN
            )
          }
        });
      },
      fetchOptions: {
        headers: {
          Authorization: getRequestAuthToken(
            undefined,
            this.config.AUTH_PUBLIC_TOKEN
          )
        }
      }
    });
    client.defaultOptions.query = {
      fetchPolicy: "no-cache"
    };
    return client;
  }
}
