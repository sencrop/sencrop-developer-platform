import Head from 'next/head'
import styled from 'styled-components';
import Header from './Header'
import GA from './GA'
import NoSSR from 'react-no-ssr';
import { color, spacing } from '../ui'

const Layout = (props) => (
  <div>
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
      <link rel="icon" type="image/png" href="/images/favicon.png"/>
      <meta name="robots" content="index,follow"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet" />
    </Head>
    <Header
      home={props.home}
      guide={props.guide}
      reference={props.reference}
      tools={props.tools}
    />
    <Wrapper>
      {props.children}
    </Wrapper>
    <NoSSR>
      <GA />
    </NoSSR>
  </div>
)

export default Layout

const Wrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: ${spacing()} auto;
`;
