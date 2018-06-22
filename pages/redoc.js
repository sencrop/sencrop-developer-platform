import dynamic from 'next/dynamic';
import Layout from '../components/Layout'
const SwaggerRedoc = dynamic(
  import('../components/SwaggerRedoc'),
  {
    loading: () => null,
    ssr: false,
  }
);

const APIRedoc = () => (
  <Layout layout='full' title={ 'API Reference' } description={
`An exhaustive list of every endpoints you may use
 in our API.`.replace(/\n/, '')
  } reference>
    <SwaggerRedoc/>
  </Layout>
)

export default APIRedoc;
