import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import SEO from "../components/seo";
import { GlobalStyle, color } from "@sencrop/ui"
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <SEO />
      <Navbar />
      <Main>{children}</Main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const Main = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1rem 2rem;
  
  blockquote {
    border-left: 4px solid ${color("green")};
    margin: 0;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
  }
  
  pre[class*="language-"] {
    font-size: 0.75rem;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
    code {
      background: none;
    }
  }
  code[class*="language-text"] {
    color: ${color("grey", "dark")};
    font-size: 0.9rem;
    background-color: ${color("grey", "faint")};
  }
  a {
    color: ${color("green")};
  }
  h1,
  h2,
  h3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.75rem;
  }
  ul {
    margin-bottom: 1rem;
    li {
      margin-bottom: 0.5rem;
    }
  }
  code,
  pre {
    margin-bottom: 1.5rem;
  }
`

export default Layout
