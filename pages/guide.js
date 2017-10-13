import Layout from '../components/Layout'

const Index = () => (
  <Layout title={ 'API Guide' } description={
`A simple guide to help you using our API.`.replace(/\n/, '')
  }>
    <h1>API Guide</h1>
    <p>
      Most of our API requires you to pass
      a token via the Bearer HTTP mecanism.
      We plan to integrate OAuth authentication
      that will provide you a way to obtain
      that token from our users.
    </p>
    <p>
      Currently, since our public API is in a
      call for advice state, you can only use
      our API with your own token, generated
      on our application.
    </p>
  </Layout>
)

export default Index
