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

    {/* The CSS code for pre in ../ui/index.js overrides the CSS code in swagger-ui. The following code resolves this issue */}
    <style>{`
      /* Version bubble */
      .swagger-ui .info .title small pre { background-color: inherit !important; }

      /* Base Url */
      .swagger-ui .base-url { background-color: inherit !important; }

      /* Payloads */
      .swagger-ui .microlight { background-color: #41444e !important; color: #FFF !important; }
    `}</style>
  </Layout>
)

export default APIReference
