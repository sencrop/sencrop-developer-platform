import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SEO from "../components/seo";
import Navbar from "./Navbar";
import { ThemeProvider, GlobalStyle } from "@sencrop/ui-components";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const t = localStorage.getItem("theme");
    setTheme(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProvider name={theme}>
      <>
        <GlobalStyle />
        <SEO />
        <Navbar onThemeChange={setTheme} />
        <Main>{children}</Main>
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

const Main = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1rem 2rem;

  blockquote {
    border-left: 4px solid ${props => props.theme.color("branding", "primary")};
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
    color: ${props => props.theme.color("text", "primary")};
    font-size: 0.9rem;
    background-color: ${props => props.theme.color("background", "primary")};
  }
  a {
    color: ${props => props.theme.color("branding", "primary")};
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

  /* Swagger UI */
  .swagger-ui .info .title {
    color: ${props => props.theme.color("text", "primary")};
  }
  .swagger-ui .opblock-tag {
    color: ${props => props.theme.color("text", "secondary")};
  }

  .swagger-ui .expand-methods,
  .swagger-ui .expand-operation,
  .swagger-ui .authorization__btn.unlocked {
    svg {
      fill: ${props => props.theme.color("text", "primary")};
    }
  }

  .swagger-ui .scheme-container {
    background-color: ${props =>
      props.theme.color("background", "primary:lighten")};
  }

  .swagger-ui .opblock .opblock-summary-description {
    color: ${props => props.theme.color("text", "secondary")};
  }
  .swagger-ui .opblock .opblock-summary-operation-id,
  .swagger-ui .opblock .opblock-summary-path,
  .swagger-ui .opblock .opblock-summary-path__deprecated {
    color: ${props => props.theme.color("text", "secondary")};
  }
  .swagger-ui .opblock .opblock-section-header {
    background-color: ${props => props.theme.color("background", "primary")};
  }
  .swagger-ui .opblock .opblock-section-header h4 {
    color: ${props => props.theme.color("text", "secondary")};
  }
  .swagger-ui .btn {
    border-color: ${props => props.theme.color("border", "primary")};
    color: ${props => props.theme.color("text", "tertiary")};
  }

  .swagger-ui {
    ${props =>
      props.theme.name === "dark" &&
      css`
        th,
        td,
        tr,
        p,
        span {
          &,
          & * {
            color: ${props =>
              props.theme.name === "dark" &&
              props.theme.color("text", "primary")} !important;
          }
        }
        select {
          color: ${props => props.theme.color("text", "dark")} !important;
        }
      `};
  }
`;

export default Layout;
