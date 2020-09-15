import React from 'react'

import HomePage from '../src/pages/home/HomePage'

import { getInitialProps } from '../src/pages/home/getInitialProps'

// Don't add neither logic or layout here. This file simply delegates all that to files in the src dir.

HomePage.getInitialProps = getInitialProps

export default HomePage
