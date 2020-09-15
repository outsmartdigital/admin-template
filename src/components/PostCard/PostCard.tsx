import React from "react";
import {
  useGlobal,
  useGlobalEntity
} from "../../global/_globalUtils/useGlobal";

export interface PostCardProps {
  postId: string;
}

export const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const [post] = useGlobalEntity({ post: true }, postId);
  return <div>{post.title}</div>;
};
