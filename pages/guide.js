import Link from 'next/link'
import Layout from '../components/Layout'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

const PING_ENDPOINT = 'https://api.sencrop.com/v1/ping';
const CURL_PING_CODE = `
curl ${PING_ENDPOINT}
# Answers: {"pong":"pong"}
`;
const TOKEN_RETRIEVAL_CODE = `
console.log({
  token: 'Bearer ' +
    JSON.parse(localStorage.state).user.token,
  userid: JSON.parse(localStorage.state).user.id,
})
// Prints: { token: 'Bearer xxxxxxxx', userId: 1664 }
`;
const CURL_SENCROP_DEVICES_CODE = `
curl https://api.sencrop.com/v1/users/1664/devices\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_DEVICES_PAYLOAD = `
{
  "items": [
    "BI6BA46",
    "114711"
  ],
  "devices": {
    "BI6BA46": {
      "id": "BI6BA46",
      "accessPeriods": [{
        "role": "collaborator",
        "startDate": "2017-03-15T23:00:00.000Z"
      }],
      "modelId": 7,
      "userId": 1,
      "organisationId": 1,
      "identification": "SC999999",
      "contents": {
        "name": "Rain sensor 1"
      }
    },
    "114711": {
      "id": "114711",
      "accessPeriods": [{
        "role": "collaborator"
      }],
      "modelId": 7,
      "userId": 1,
      "organisationId": 1,
      "identification": "SC666999",
      "contents": {
        "name": "Rain sensor 2"
      }
    },
  },
  "models": {
    "7": {
      "id": 7,
      "contents": {
        "name": "Raincrop",
        "externalDiameter": 0.206,
        "conception": "France - Lille",
        "manufacturing": "Europe-France",
        "calibration": "Ok",
        "weight": 3.5
      }
    }
  }
}
`;
const CURL_SENCROP_RAW_DATA_CODE = `
curl "https://api.sencrop.com/v1/users/1664/devices/B16BA4/data/raw?size=100&beforeDate=2017-10-10T00:00:00Z&measures=TEMP_AIR_H1"\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_RAW_DATA_PAYLOAD = `
[
  {
    "date": "2017-10-09T23:54:07.000Z",
    "type": "RH_AIR_H1",
    "value": 65.2,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:54:07.000Z",
    "type": "TEMP_AIR_H1",
    "value": 15.100000000000001,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:39:07.000Z",
    "type": "RH_AIR_H1",
    "value": 66.7,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:39:07.000Z",
    "type": "TEMP_AIR_H1",
    "value": 14.8,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:24:06.000Z",
    "type": "TEMP_AIR_H1",
    "value": 14.9,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:24:06.000Z",
    "type": "RH_AIR_H1",
    "value": 65.7,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:09:07.000Z",
    "type": "RH_AIR_H1",
    "value": 67.4,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:09:07.000Z",
    "type": "TEMP_AIR_H1",
    "value": 14.5,
    "discarded": false
  },
  {
    "date": "2017-10-09T22:54:06.000Z",
    "type": "TEMP_AIR_H1",
    "value": 15,
    "discarded": false
  },
  {
    "date": "2017-10-09T22:54:06.000Z",
    "type": "RH_AIR_H1",
    "value": 64.2,
    "discarded": false
  }
]
`;

const Index = () => (
  <Layout title={ 'API Guide' } description={
`A simple guide to help you using our API.`.replace(/\n/, '')
  }>
    <h1>API Guide</h1>
    <p>
      The Sencrop API allows you to retrieve
      our users informations and create value
      on top of it.
    </p>
    <p>
      In this guide we discuss some design
      choices in order to help you grasp our
      API internals quicker.
    </p>
    <h2>First contact</h2>
    <p>
      You can simply hit the Sencrop API
      by simply opening ou ping endpoint
      in you browser:<br/>
      <a href="${PING_ENDPOINT}"
      >${PING_ENDPOINT}</a>
      You probably noticed we are using the
      https protocol so that informations
      transiting between your systems and
      the Sencrop ones remain confidential.
    </p>
    <p>
      You can also use the command line to
      ping our API with the help of curl:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>{
      CURL_PING_CODE
    }</SyntaxHighlighter>
    <h2>Get your token</h2>
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
    <p>
      To grab a token, just connect to
      the <a href="http://app.sencrop.com"
      >Sencrop Web Application</a> and log
      in.
    </p>
    <p>
      We will soon provide you a interface
      to manage your applications token but
      in the meanwhile, you can open the
      developer console and copy/paste this
      snippet:
    </p>
    <SyntaxHighlighter language="javascript" style={docco}>{
      TOKEN_RETRIEVAL_CODE
    }</SyntaxHighlighter>
    <p>
      Great! You can now access your Sencrop data
      with the help of your token. The user id
      will also help since almost every protected
      endpoints requires your to fill it.
    </p>
    <p>
      Starting here, you can directly jump to
      the <Link href="/reference"><a>API
      reference</a></Link> and insert your token
      right in the Authorization field of the
      protected endpoints.
    </p>
    <p>
      Or just continue your journey through
      our API!
    </p>
    <h2>Listing your devices</h2>
    <p>
      Before retrieving your data you may want
      to simply liste your own Sencrop Devices:
    </p>
    <SyntaxHighlighter language="javascript" style={docco}>{
      CURL_SENCROP_DEVICES_CODE
    }</SyntaxHighlighter>
    <p>The result will look like this:</p>
    <SyntaxHighlighter language="json" style={docco}>{
      SENCROP_DEVICES_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      The <code>items</code> property indicates
      your the collection of devices you can access
      to. While the <code>devices</code> hash
      allows your to pickup the devices details.
    </p>
    <h2>Reading raw device data</h2>
    <p>
      Your devices regularly send meteoroligical
      data to our servers. You can get their
      direct output by simply requesting the
      following endpoint:
    </p>
    <SyntaxHighlighter language="javascript" style={docco}>{
      CURL_SENCROP_RAW_DATA_CODE
    }</SyntaxHighlighter>
    <p>The result will look like this:</p>
    <SyntaxHighlighter language="json" style={docco}>{
      SENCROP_RAW_DATA_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      The <code>date</code>, <code>type</code> and
      <code>value</code> fields are self explanatory.
      The <code>discarded</code> field is a bit more
      special, he means that our algorithm detected
      that the measure was wrong. It can be due to
      many different issues (hardware failure,
      bad installation, network failures etc...).
    </p>
  </Layout>
)

export default Index
