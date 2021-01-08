import { ErrorResponse } from "apollo-link-error";

import { ErrorCode } from "../../../../models/ErrorCode";
import { GraphQLErrorCode } from "../GraphQLErrorCode";

export type GraphQLErrorTranslator = (
  graphQlError: GraphQLErrorCode | undefined
) => ErrorCode;

export const translateGraphQlError = (translator: GraphQLErrorTranslator) => (
  e: ErrorResponse
) => {
  const firstGraphqlErrorCode: GraphQLErrorCode | undefined =
    e.graphQLErrors?.[0].extensions?.code;
  throw translator(firstGraphqlErrorCode);
};

export const handleGraphQlError = (
  mapper?: { [key in GraphQLErrorCode]: ErrorCode }
) => (e: ErrorResponse) => {
  if (e.networkError) {
    throw ErrorCode.NETWORK_ERROR;
  }
  const firstGraphqlErrorCode: GraphQLErrorCode =
    e.graphQLErrors?.[0]?.extensions?.code ||
    GraphQLErrorCode.INTERNAL_SERVER_ERROR;
  const translatedErrorCode = mapper?.[firstGraphqlErrorCode];
  throw translatedErrorCode || ErrorCode.UNKNOWN_ERROR;
};
