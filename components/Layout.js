import Head from 'next/head'
import Header from './Header'
import GA from './GA'
import NoSSR from 'react-no-ssr';
import { font, color, spacing } from '../ui'

const Layout = (props) => (
  <div>
    <style jsx global>{`
    body {
      line-height: 1.5;
      font-family: ${font('text')};
      color: ${color('blue', 'dark')};
      background-color: #ebeef0;
      box-sizing: border-box;
      margin: 0;
    }
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
    ul > li:before {
      content: '- ';
    }
    a {
      outline: none;
      text-decoration: none;
      color: ${color('green')};
      transition: color 150ms ease;
      cursor: pointer;
    }
    a:hover {
      color: ${color('green')};
      text-decoration: underline;
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
    }

    input::-webkit-input-placeholder {
      color: #b2b2b2;
    }
    input:-moz-placeholder {
      color: #b2b2b2;
    }
    input:-ms-input-placeholder {
      color: #b2b2b2;
    }
    input::-moz-placeholder {
      color: #b2b2b2;
    }
    input:hover, input:focus, input:active {
      border-color: ${color('anthracite')};
    }
    input[type=submit] {
      background: linear-gradient(10deg, ${color('green')} 35%, ${color('green', 'light')} 65%);
      font-weight: 400;
      color: #fff;
      box-shadow: 0px 15px 24px 0px rgba(8,37,25, .15);
      border-radius: 4px;
      border: none;
      margin-left: ${spacing(0.5)};
    }
    input[type=submit]:hover {
      color: #fff;
      box-shadow: 0px 15px 30px 0px rgba(8,37,25, .25);
      background: linear-gradient(10deg, ${color('green', 'light')} 35%, ${color('green', 'light')} 65%);
    }

    input[type=submit]:focus,
    input[type=submit]:active {
      background: linear-gradient(10deg, ${color('green')} 35%, ${color('green', 'light')} 65%);
    }
    pre {
      margin-top: 0 !important;
    }
    *, :after, :before {
      box-sizing: inherit;
    }
    `}</style>
    <style jsx>{`
      div.wrapper {
        width: 80%;
        max-width: 1200px;
        margin: ${spacing()} auto;
      }
    `}</style>
    <Head>
      <meta charSet="utf-8"/>
      <title>{
        `${
          props.title ?
          `${props.title} - `
          : ''
        }Sencrop Developers Platform`
      }</title>
      <meta name="viewport" content="width=device-width"/>
      <meta name="description" content={
        props.description ||
        props.title ||
        'A page of the Sencrop Developer Platform.'
      }/>
      <link rel="icon" type="image/png" href="/static//images/favicon.png"/>
      <meta name="robots" content="index,follow"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet" />
    </Head>
    <Header
      home={props.home}
      guide={props.guide}
      partners={props.partners}
      reference={props.reference}
      tools={props.tools}
    />
    <div className="wrapper">
      {props.children}
    </div>
    <NoSSR>
      <GA />
    </NoSSR>
  </div>
)

export default Layout

