// This is a mock model that simulates a post from the GraphQL Api
// Once the backend template models a real post, there is no longer need for this model
// and it should be deleted
export interface MockPostApiModel {
  id: string;
  title: string;
  authorId: string;
  body: string;
}
