import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import Head from "next/head";
import { PageComponent } from "../../utils/architecture/PageComponent";
import { PostCard } from "../../components/PostCard/PostCard";
import { useService } from "../../utils/architecture/di/containerContext";
import { PostRepository } from "../../repository/PostRepository";
import { useUseCase } from "../../utils/hooks/useUseCase";
import { GetPostUc } from "../../services/posts/useCases/GetPostUC";

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface HomePageProps {}

export const HomePage: PageComponent<HomePageProps> = () => {
  const postRepository = useService(PostRepository);
  const postIds = postRepository.useHomePagePostIds();

  const { request: getPost } = useUseCase(GetPostUc);

  useEffect(() => {
    const postId = "123";
    getPost(postId);
  }, []);

  const renderedPosts = useMemo(() => {
    return postIds.map(postId => {
      return <PostCard key={`homePagePost.${postId}`} postId={postId} />;
    });
  }, [postIds]);

  return (
    <HomeContainer>
      <Head>
        <title>Home Page</title>
      </Head>
      {renderedPosts}
    </HomeContainer>
  );
};
