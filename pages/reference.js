import Head from 'next/head'
import NoSSR from 'react-no-ssr';

import Layout from '../components/Layout'
import Swagger from '../components/Swagger'

const APIReference = () => (
  <Layout title={ 'API Reference' } description={
`An exhaustive list of every endpoints you may use
 in our API.`.replace(/\n/, '')
  } reference>
    <h1>API Reference</h1>
    <Head>
      <link rel="stylesheet" href="/static/styles/swagger-ui.css"/>
    </Head>
    <NoSSR>
      <Swagger/>
    </NoSSR>
    <style jsx>{`
      .swagger-ui .info .title small pre { background-color: inherit !important; }
    `}</style>
  </Layout>
)

export default APIReference
