import React, { useMemo } from 'react'
import styled from 'styled-components'

import Head from 'next/head'

import { messages } from './messages'
import { FormattedMessage } from 'react-intl'

import { useGlobal } from '../../global/_globalUtils/useGlobal'
import { PageComponent } from '../../utils/architecture/PageComponent'
import { PostCard } from '../../components/PostCard/PostCard'

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// TODO: check where to put this component
//         <FormattedMessage {...messages.greeting} />

export interface HomePageProps {}

export const HomePage: PageComponent<HomePageProps> = () => {
  const [postIds] = useGlobal('homePagePosts')

  const renderedPosts = useMemo(() => {
    return postIds.map((postId) => {
      return <PostCard key={`homePagePost.${postId}`} postId={postId} />
    })
  }, [postIds])

  return (
    <HomeContainer>
      <Head>
        <title>Home Page</title>
      </Head>
      {renderedPosts}
    </HomeContainer>
  )
}

export default HomePage
