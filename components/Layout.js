import Head from 'next/head'
import Header from './Header'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
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
    </Head>
    <Header />
    {props.children}
    <style jsx>{`
      h1 { color: red; }
    `}</style>
  </div>
)

export default Layout
