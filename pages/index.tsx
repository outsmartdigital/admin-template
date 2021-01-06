import React from 'react'
import { HomePage } from '../src/pages/home/HomePage'
import { getInitialProps } from '../src/pages/home/getInitialProps'
import { PostService } from '../src/services/posts/PostService'
import { GraphQLPostApiService } from '../src/services/posts/GraphQLPostApiService'
import { MockPostApiService } from '../src/services/posts/MockPostApiService'

// Don't add neither logic or layout here. This file simply delegates all that to files in the src dir.

HomePage.getInitialProps = getInitialProps

HomePage.getInjectables = () => [[PostService, MockPostApiService]] // could use GraphQLPostApiService

export default HomePage
