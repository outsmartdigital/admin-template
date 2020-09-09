import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const AppHeader: React.FC = () => {
  return <Container />
}
