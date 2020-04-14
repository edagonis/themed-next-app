import React from "react"
import styled from "styled-components"

const StyledContainer = styled.div(({ theme }) => {
  const {
    breakpoints: { desktop },
  } = theme

  return `
      margin: 0 auto;
      max-width: 42rem;
      padding: 8rem 1.5rem;
      @media (min-width: ${desktop}) {
        padding: 8rem 3rem;
      }
    `
})

function Layout({ children }) {
  return <StyledContainer>{children}</StyledContainer>
}

export default Layout
