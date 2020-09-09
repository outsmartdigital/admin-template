/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHomepagePosts
// ====================================================

export interface GetHomepagePosts_allAreas {
  __typename: "AreasConnection";
  /**
   * The count of *all* `Area` you could get from the connection.
   */
  totalCount: number;
}

export interface GetHomepagePosts {
  /**
   * Reads and enables pagination through a set of `Area`.
   */
  allAreas: GetHomepagePosts_allAreas | null;
}
