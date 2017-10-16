import React from 'react';
import styled, { injectGlobal, css } from 'styled-components';
import NextLink from 'next/link';
import { color, ui } from './Colors';

export { color, ui } from './Colors';

const fontsFamilies = {
  ui: 'Montserrat, -apple-system, Roboto, "Segoe UI", sans-serif',
  text: '"Open Sans", -apple-system, Roboto, "Segoe UI", sans-serif',
  mono: '"Fira Mono", Inconsolata, Monaco, monospace',
};

export const font = name => fontsFamilies[name] || fontsFamilies.text;
export const spacing = (ratio = 1) => `${ratio * 16}px`;

injectGlobal`
  body {
    line-height: 1.5;
    font-family: ${font('text')};
    color: ${color('blue', 'dark')};
    background-color: #ebeef0;
    box-sizing: border-box;
    margin: 0;
    button, input, select, textarea {
      color: inherit;
      font-size: inherit;
      line-height: initial;
      outline: none;
    }
    h1, h2, h3, h4, h5 {
      font-family: ${font('text')};
      font-weight: 900;
      color: ${color('blue', 'dark')};
    }
    button {
      border: none;
      cursor: pointer;
    }
    ul {
      margin: 0;
      list-style-type: none;
      padding-left: 0;
    }
    a {
      outline: none;
      text-decoration: none;
      color: ${color('green')};
      transition: color 150ms ease;
      cursor: pointer;

      &:hover {
        color: ${color('green')};
        text-decoration: underline;
      }
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
    }
    input {
      display: inline-block;
      outline: none;
      padding: ${spacing(2 / 3)} ${spacing()};
      border: 1px solid ${color('anthracite', 'light')};
      transition: border-color 150ms ease-out;
      border-radius: 4px;
      background-color: #fff;

      &:hover, &:focus, &:active {
        border-color: ${color('anthracite')};
      }
      
      ::-webkit-input-placeholder {
        color: #b2b2b2;
      }
      :-moz-placeholder {
        color: #b2b2b2;
      }
      :-ms-input-placeholder {
        color: #b2b2b2;
      }
      ::-moz-placeholder {
        color: #b2b2b2;
      }
    }
    input[type=submit] {
      background: linear-gradient(10deg, ${color('green')} 35%, ${color('green', 'light')} 65%);
      font-weight: 400;
      color: #fff;
      box-shadow: 0px 15px 24px 0px rgba(8,37,25, .15);
      border-radius: 4px;
      border: none;
      margin-left: ${spacing(0.5)};
      &:hover {
        color: #fff;
        box-shadow: 0px 15px 30px 0px rgba(8,37,25, .25);
        background: linear-gradient(10deg, ${color('green', 'light')} 35%, ${color('green', 'light')} 65%);
      }

      &:focus,
      &:active {
        background: linear-gradient(10deg, ${color('green')} 35%, ${color('green', 'light')} 65%);
      }
    }
    pre {
      margin-top: 0 !important;
      background-color: #fff !important;
    }
  }
  *, :after, :before {
    box-sizing: inherit;
  }
`;

export const Link = styled(({ active, ...rest }) => <NextLink {...rest} />)`
  cursor: pointer;
  color: ${color('green')};

  &:hover {
    color: ${color('green', 'light')};
    text-decoration: underline;
  }
`;

export const ExternalLink = Link.withComponent('a');

export const Title = styled.h1`
  color: ${ui('text--dark')};
  font-family: ${font('headings')};
  display: flex;
  text-align: center;
  font-size: 1.414em;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing(2)};
  margin-top: 0;
  font-weight: 400;
`;

export const Subtitle = styled.h2`
  color: ${ui('text--dark')};
  font-family: ${font('headings')};
  font-size: 1.189em;
  text-align: center;

  small {
    font-size: .8125em;
    display: block;
    color: ${color('anthracite')};
    font-weight: 400;
  }
`;