import gql from "graphql-tag";

// TODO get an actual posts api
export const GET_HOMEPAGE_POSTS = gql`
  query GetHomepagePosts {
    allAreas {
      totalCount
    }
  }
`;
