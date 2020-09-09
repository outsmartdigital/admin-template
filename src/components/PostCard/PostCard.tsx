import React from "react";
import { useService } from "../../utils/architecture/di/containerContext";
import { PostRepository } from "../../repository/PostRepository";

export interface PostCardProps {
  postId: string;
}

export const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const postRepository = useService(PostRepository);
  const post = postRepository.usePost(postId);
  return <div>{post.title}</div>;
};
