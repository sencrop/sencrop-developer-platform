import React, { useState } from "react";
import styled, { css, withTheme } from "styled-components";
import { text, media, IconButton, Icon } from "@sencrop/ui-components";
import { Link, useStaticQuery, graphql } from "gatsby";
import logo from "../images/sencrop-white.svg";

const Navbar = props => {
  const { allMdx } = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___position] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              path
              position
            }
          }
        }
      }
    }
  `);

  const { theme, onThemeChange } = props;

  const [isOpen, setOpen] = useState(false);
  const toggleTheme = () => {
    onThemeChange(theme.name === "light" ? "dark" : "light");
  };
  const toggle = () => setOpen(!isOpen);

  return (
    <Background>
      <Wrapper>
        <Main>
          <Logo src={logo} />
          <Menu onClick={toggle}>
            <Icon name={isOpen ? "close" : "menu"} />
          </Menu>
        </Main>
        <Links isOpen={isOpen}>
          {allMdx.edges.map(({ node }) => (
            <NavLink key={node.id} as={Link} to={node.frontmatter.path}>
              {node.frontmatter.title}
            </NavLink>
          ))}
          <NavLink
            href="https://sencrop.typeform.com/to/dFLmCl"
            target="_blank"
            rel="noopener"
          >
            Bug report
          </NavLink>
        </Links>
        <Spacer />
        <ThemeContainer>
          <IconButton onClick={toggleTheme}>
            <Icon
              name={theme.name === "light" ? "bulb" : "bulb-o"}
              color="warning"
              size={24}
            />
          </IconButton>
        </ThemeContainer>
      </Wrapper>
    </Background>
  );
};

export default withTheme(Navbar);

const Background = styled.div`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.color("background", "dark")};
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.greaterThan("tablet")`
    flex-direction: row;
    height: 60px;
    padding: 0 1rem;
    max-width: 1280px;
    margin: auto;
  `}
`;

const Main = styled.div`
  position: relative;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.greaterThan("tablet")`
    height: 100%;
    padding-bottom: 6px;
    margin-right: 1rem;
  `}
`;

const Menu = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  margin: auto 0;
  cursor: pointer;
  i {
    font-size: 36px;
    color: ${props => props.theme.color("text", "light")};
  }
  ${media.greaterThan("tablet")`
    display: none;
  `}
`;

const Logo = styled.img`
  margin: auto;
  height: 30px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;
  ${props =>
    props.isOpen &&
    css`
      display: flex;
    `};
  ${media.greaterThan("tablet")`
    display: flex;
    flex-direction: row;
    height: 100%;
  `}
`;

const NavLink = styled.a`
  color: ${props => props.theme.color("text", "light")};
  ${text("title", "l")}
  padding: 0 1rem 0.5rem 1rem;
  &[aria-current="page"] {
    color: ${props => props.theme.color("branding", "primary")};
  }
  ${media.greaterThan("tablet")`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    height: 100%;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    &[aria-current="page"] {
      border-bottom-color: ${props => props.theme.color("branding", "primary")};
    }
  `}
`;

const Spacer = styled.span`
  flex: 1;
`;

const ThemeContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  ${media.greaterThan("tablet")`
    top: inherit;
    left: inherit;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
