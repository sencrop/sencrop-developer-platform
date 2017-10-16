import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

const INSTALL_CODE = `npm install --save sencrop-js-api-client
`;
const USAGE_CODE = `import API from 'sencrop-js-api-client';

API.getUserDeviceStatistics({
  authorization: 'Bearer yolo-token',
  startDate: '2014-07-01T00:00:00.000Z',
  endDate: '2017-07-21T00:00:00.000Z',
}, {
  // Here goes any Axios request configuration override
  // See: https://github.com/mzabriskie/axios#request-config
  timeout: 40000,
})
.then(response => {
  console.log({
    response,
  });
});
`;

import Layout from '../components/Layout'

const Index = () => (
  <Layout title={ 'Tools' } description={
`Get some more tooling to interact with our API.`.replace(/\n/, '')
  } tools>
    <h1>Tools</h1>
    <h2>Swagger/OpenAPI Definition</h2>
    <p>
      You can <a href="/static/swagger.api.json"
      download="sencrop-v1.swagger.js"
      >download</a> our Swagger/OpenAPI definition
      so that you can use it in your own tools.
    </p>
    <p>
      For instance, you may like to import
      it <a href="https://www.getpostman.com/docs/postman/collections/data_formats"
      >into Postman</a>.
    </p>
    <h2>JavaScript SDK</h2>
    <p>
      To use our API writing less code, you can
      also use our JavaScript SDK.
    </p>
    <p>
      To install it, you must have NodeJS and NPM
      installed:
    </p>
    <SyntaxHighlighter language='bash' style={docco}>{
      INSTALL_CODE
    }</SyntaxHighlighter>
    <p>
      Then in your client application:
    </p>
    <SyntaxHighlighter language='javascript' style={docco}>{
      USAGE_CODE
    }</SyntaxHighlighter>
    <p>
      You may want to check our <a
        href="https://github.com/sencrop/sencrop-js-api-client"
        >SDK source on GitHub</a>. It is also a
      good place to report issues or feature
      requests with our SDK.
    </p>
  </Layout>
)

export default Index
