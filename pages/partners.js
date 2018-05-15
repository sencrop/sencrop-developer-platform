import Link from 'next/link'
import Layout from '../components/Layout'

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import js from 'react-syntax-highlighter/dist/languages/javascript'
import docco from 'react-syntax-highlighter/dist/styles/docco'

registerLanguage('javascript', js);

const CURL_SENCROP_TOKEN_CREATION = `
curl https://api.sencrop.com/v1/partners/1/tokens \
  -X POST --data '{"email":"nicolas@sencrop.com", "code": "MODULE"}' \
  -H 'Content-Type: application/json' \
  -u 'alibaba:open_sesame'
`;

const CURL_SENCROP_TOKEN_REQUEST = `
curl https://api.sencrop.com/v1/partners/1/tokenRequests \
  -X POST --data '{"email":"nicolas@sencrop.com"}' \
  -H 'Content-Type: application/json' \
  -u 'alibaba:open_sesame'
`;

const CURL_SENCROP_TOKEN_CLAIM = `
curl https://api.sencrop.com/v1/partners/1/tokens \
  -X POST --data '{"email":"nicolas@sencrop.com", "code": "P6YEES"}' \
  -H 'Content-Type: application/json' \
  -u 'alibaba:open_sesame'
`;

const SENCROP_TOKEN_CLAIM_PAYLOAD = `
{
  "userId":1,
  "organisationId":1,
  "token":"aac64190008c7f7b216ce91e7f1dec37ea615f1a3f5630cfc2ded6232badbb703c11a0c8dd2bbd5a8abb10d44427ae21131b3fd43cfe6fcebcc1fc84d89f10b6d6c85cd3f704cffc8486831d35f831f06ec9dd7d3e5c9e8f0fcc3658f1055cfe1516ee159120b964a40af7c462589edcd1243869ccd294144244c9426d3d6dc0",
  "expirationDate":"2018-03-03T08:08:48.062Z"
}
`;

const Partners = () => (
  <Layout title={ 'API Guide' } description={
`Quick tour of the parners API.`.replace(/\n/, '')
} partners>
    <h1>Partners API</h1>
    <p>
      The Sencrop API allows a simpler
      authorization delegation process for
      its partners program.
    </p>
    <p>
      The partners API requires you to contact
      us before being allowed to use it. To do
      so, please <a href="https://app.sencrop.com/signup"
      >create an
      account</a> and <a href="https://sencrop.typeform.com/to/XzDjNC"
      >contact us then</a>.
    </p>
    and <p>
      After contacting us, you will get.
    </p>
    <ol>
      <li>
        your API credentials (client id and
        client secret) to interact with the
        partners API authorization server,
      </li>
      <li>
        and your API token to interact with our
        REST API on your own data.
      </li>
    </ol>
    <p>
      Those informations will soon be manageable
      by your side but in the meanwhile, please
      contact us to renew it.
    </p>
    <h2>Delegation flows</h2>
    <p>
      You can obtain a token from our users via 2
      distinct flows currently, the SMS flow or the
      module flow.
    </p>
    <h3>Module flow</h3>
    <p>
      This flow allows you to directly create tokens
      for our users. The prerequisite is that the user
      must have activated at least one of your modules
      on their Sencrop application.
    </p>
    <SyntaxHighlighter language="bash" style={docco}>{
      CURL_SENCROP_TOKEN_CREATION
    }</SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>{
      SENCROP_TOKEN_CLAIM_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      To see the users that enabled on of your modules,
      your can use the <code>/partners/{'{'}partnerId{'}'}/devices</code>{' '}
      endpoint.
    </p>
    <p>
      If you try to create a token for a user with none of
      your modules activated you will get a{' '}
      <code>E_MODULE_NOT_ACTIVATED</code> error.
    </p>
    <h3>SMS flow</h3>
    <p>
      You can obtain a token from our users by sending
      them an SMS with a validation code that allows
      you to request the users authorization to access
      their data.
    </p>
    <p>
      Obtaining a token via this flow involves 4 distinct
      steps.
    </p>
    <p>
      First, you must collect the Sencrop
      user email via your own UI (remember
      to require the email they used to
      subscribe to Sencrop).
    </p>
    <p>
      Then, create a token request. This will
      trigger an SMS to the user with a 6 chars
      authorization code.
    </p>
    <p>
      Finally ask users for that code and call our
      token claim endpoint. It will provide you
      a token allowing you to act on the behalf
      of that user.
    </p>
    <h4>Requesting a token</h4>
    <p>
      To request a token just call the following
      endpoint with your API client id and secret:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>{
      CURL_SENCROP_TOKEN_REQUEST
    }</SyntaxHighlighter>
    <p>
      This will send a SMS to the user with
      an authorization code.
    </p>
    <h4>Creating a token</h4>
    <p>
      To create the token just call the following
      endpoint with your API client id and secret:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>{
      CURL_SENCROP_TOKEN_CLAIM
    }</SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>{
      SENCROP_TOKEN_CLAIM_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      That token allows your to access the user
      data through the
      API. <Link href="/guide"><a>See our API
      guide</a></Link> for more information
      on its usage.
    </p>
    <p>
      The full endpoints documentation can
      be found in the <Link href="/reference"><a>API
      reference</a></Link> under the partners
      tag.
    </p>
  </Layout>
)

export default Partners
