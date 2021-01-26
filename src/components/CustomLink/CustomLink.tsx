import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const NoDecoration = styled.a`
  text-decoration: none;
  color: 'black';
`

export interface CustomLinkProps {
  href: string
  as?: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, as, children }) => {
  return (
    <Link href={href} as={as}>
      <NoDecoration>{children}</NoDecoration>
    </Link>
  )
}

export default CustomLink
