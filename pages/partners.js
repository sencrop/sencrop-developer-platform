import Link from "next/link";
import Layout from "../components/Layout";
import Anchor from "../components/Anchor";

import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import js from "react-syntax-highlighter/languages/hljs/javascript";
import bash from "react-syntax-highlighter/languages/hljs/bash";
import docco from "react-syntax-highlighter/styles/hljs/docco";

registerLanguage("javascript", js);

const CURL_SENCROP_PARTNER_TOKEN_CREATION = `
curl 'https://api.sencrop.com/v1/oauth2/token' \\
  -u '<APPLICATION_ID>:<APPLICATION_SECRET>' \\
  -X POST --data '{"grant_type": "client_credentials", "scope": "user"}' \\
  -H 'Content-Type: application/json'
`;
const SENCROP_PARTNER_TOKEN_PAYLOAD = `
{
    "access_token": "<PARTNER_ACCESS_TOKEN>",
    "token_type": "bearer",
    "expires_in": 1500015046639,
    "refresh_token": "<PARTNER_REFRESH_TOKEN>"
}
`;

const CURL_SENCROP_PARTNER_USER_RETRIEVAL = `
curl 'https://api.sencrop.com/v1/me' \\
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>" \\
  -L
`;

const CURL_SENCROP_TOKEN_CREATION = `
curl https://api.sencrop.com/v1/partners/<PARTNER_ID>/tokens \\
  -u '<APPLICATION_ID>:<APPLICATION_SECRET>' \\
  -X POST --data '{"email":"nicolas@sencrop.com", "code": "MODULE"}' \\
  -H 'Content-Type: application/json'
`;

const CURL_SENCROP_TOKEN_REQUEST = `
curl https://api.sencrop.com/v1/partners/<PARTNER_ID>}/tokenRequests \\
-u '<APPLICATION_ID>:<APPLICATION_SECRET>' \\
  -X POST --data '{"email":"nicolas@sencrop.com"}' \\
  -H 'Content-Type: application/json'
`;

const CURL_SENCROP_TOKEN_CLAIM = `
curl https://api.sencrop.com/v1/partners/<PARTNER_ID>}/tokens \\
  -u '<APPLICATION_ID>:<APPLICATION_SECRET>' \\
  -X POST --data '{"email":"nicolas@sencrop.com", "code": "P6YEES"}' \\
  -H 'Content-Type: application/json'
`;

const SENCROP_TOKEN_CLAIM_PAYLOAD = `
{
  "userId":1,
  "organisationId":1,
  "token":"<SENCROP_USER_ACCESS_TOKEN>",
  "expirationDate":"2018-03-03T08:08:48.062Z"
}
`;

const CURL_SENCROP_PARTNER_DEVICES = `
curl -X GET "https://api.sencrop.com/v1/partners/<PARTNER_ID>}/devices?limit=10&start=0" \\
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>"
`;

const SENCROP_PARTNER_DEVICES_PAYLOAD = `
{
  "total": 1,
  "items": [
      1
  ],
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
  },
  "devicesStatuses": {
      "1": {
          "id": 1,
          "measuresCount": 66502,
          "contents": {
              "firmware": "00-V1.12",
              "signal": 6,
              "battery": 3184,
              "latitude": 48.0654,
              "longitude": 4.40095,
              "altitude": 257,
              "locationPrecision": 0,
              "locationSatellites": 7,
              "lastLocationDate": "2018-06-28T14:52:33.000Z",
              "lastMoveDate": "2018-06-28T11:58:51.000Z",
              "lastStatusUpdateDate": "2018-10-02T08:16:36.000Z",
              "lastRebootDate": "2018-06-06T18:58:04.000Z"
          }
      },
  },
  "devices": {
      "1": {
          "id": 1,
          "accessPeriods": [
              {
                  "id": 31426,
                  "deviceId": 1,
                  "delegatorId": 3,
                  "moduleId": 1,
                  "parameters": {
                      "id": "xxxxx",
                  },
                  "partnerParameters": {
                      "enabled": false,
                  },
                  "type": "partner",
                  "startDate": "2018-05-08T09:59:11.000Z"
              }
          ],
          "modelId": 7,
          "organisationId": 1,
          "previousDevicesIds": [],
          "identification": "RC00XXXX",
          "serial": "ABBACACA",
          "situation": "unknown",
          "contents": {
              "name": "Station champs 1"
          }
      },
  },
  "users": {
      "3": {
          "id": 3,
          "creationDate": "2018-02-21T10:02:00.000Z",
          "lastModificationDate": "2018-08-31T13:54:50.000Z",
          "locale": "fr-FR",
          "timeZone": "Europe/Paris",
          "organisationsIds": [
              1
          ],
          "organisationId": 1,
          "roles": [],
          "signupType": "unknown",
          "emailVerified": true,
          "contents": {
              "firstname": "Michel",
              "lastname": "Delpech",
              "email": "michel@sencrop.com",
              "address": "2 rue Fourier",
              "zipcode": "59000",
              "city": "Lille",
              "country": "FR"
          }
      },
  },
  "organisations": {
      "1": {
          "id": 1,
          "creationDate": "2014-02-21T10:02:01.000Z",
          "lastModificationDate": "2018-09-26T14:59:35.000Z",
          "type": "company",
          "placeIds": [
              1
          ],
          "contents": {
              "name": "Sencrop",
              "locale": "fr-FR",
              "timeZone": "Europe/Paris"
          }
      },
  },
  "places": {
      "1": {
          "id": 1,
          "city": "Lille",
          "country": "FR",
          "organisationId": 1,
          "creationDate": "2018-07-19T12:46:21.000Z",
          "lastModificationDate": "2018-07-19T16:34:43.000Z",
          "contents": {
              "address": "40 Rue de Wattignies, 59000 Lille, France",
              "googlePlaceId": "ChIJd3KeUZbVwkcRgg46S0kvJ48",
              "location": {
                  "lat": 50.6202,
                  "lng": 3.06451
              },
              "type": "principal"
          }
      },
  }
}
`;

const CURL_SENCROP_PARTNER_PARAMETERS = `
curl -X POST "https://api.sencrop.com/v1/partners/<PARTNER_ID>}/users/{delegatorId}/devices/{deviceId}/modules/{moduleId}/parameters" \\
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>" \\
  -X POST --data '{ "enabled": true }'
`;

const Partners = () => (
  <Layout
    title={"API Guide"}
    description={`Quick tour of the parners API.`.replace(/\n/, "")}
    partners
  >
    <h1>Partners API</h1>
    <p>
      The Sencrop API allows a simpler authorization delegation process for its
      partners program.
    </p>
    <p>
      The partners API requires you to contact us before being allowed to use
      it. To do so, please{" "}
      <a href="https://app.sencrop.com/signup">create an account</a> and{" "}
      <a href="https://sencrop.typeform.com/to/XzDjNC">contact us then</a>.
    </p>
    <p>
      After contacting us, you will get your API credentials (referred to as{" "}
      <code>{"<APPLICATION_ID>"}</code> and{" "}
      <code>{"<APPLICATION_SECRET>"}</code> in the code samples) to interact
      with the partners API endpoint protected via the{" "}
      <a href="https://en.wikipedia.org/wiki/Basic_access_authentication">
        Basic Authentication
      </a>{" "}
      (<a href="https://tools.ietf.org/html/rfc7617">RFC 7617</a>).
    </p>
    <p>
      To use our API, you will benefit from knowing your{" "}
      <code>{"<PARTNER_ID>"}</code>, we will transmit it to your with your
      application credentials.
    </p>
    <p>
      Beware that your application credentials are to be kept secret and stored
      in a safe way. You must not use it your frontend applications.
    </p>
    <p>
      Your applications listing will soon be manageable by your side but in the
      meanwhile, please contact us to renew / disable it. Feel free to ask
      several application credentials to isolate your applications or
      environments.
    </p>
    <p>
      Also note that once issued, we cannot access to your application secret so
      take care to not loose it.
    </p>
    <h2>
      <Anchor text="Issuing a partner token" />
    </h2>
    <p>
      Some partners API endpoints requires you to issue a token (referred to as{" "}
      <code>{"<PARTNER_ACCESS_TOKEN>"}</code>) for your own account to
      authenticate via the bearer authentication mechanism (
      <a href="https://tools.ietf.org/html/rfc6750.html#section-2.1">
        RFC 6750
      </a>
      ).
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_PARTNER_TOKEN_CREATION}
    </SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>
      {SENCROP_PARTNER_TOKEN_PAYLOAD}
    </SyntaxHighlighter>
    <p>
      As for application credentials, this token must remain confidential and
      stored in a secure way.
    </p>
    <p>
      If your organization owns Sencrop devices, you should now be able to
      access it via our API. You can use your{" "}
      <code>{"<PARTNER_ACCESS_TOKEN>"}</code> directly in our API reference or
      follow the API Guide if not done yet to play around with your data.
    </p>
    <p>
      Otherwise, you can ask our users to access their own devices with the
      below described delegation flows.
    </p>
    <p>
      If you want to retrieve your <code>{"<PARTNER_ID>"}</code> or{" "}
      <code>{"<USER_ID>"}</code> you can run the following command to reach your
      user profile:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_PARTNER_USER_RETRIEVAL}
    </SyntaxHighlighter>
    <h2>
      <Anchor text="Delegation flows" />
    </h2>
    <p>
      You can obtain a token from our users via 2 distinct flows currently, the
      SMS flow or the module flow.
    </p>
    <h3>
      <Anchor text="Module flow" />
    </h3>
    <p>
      This flow allows you to directly create tokens for our users. The
      prerequisite is that the user must have activated at least one of your
      modules on their Sencrop application.
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_TOKEN_CREATION}
    </SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>
      {SENCROP_TOKEN_CLAIM_PAYLOAD}
    </SyntaxHighlighter>
    <p>
      To see the users that enabled one of your modules, your can use the{" "}
      <a href="#listing_modules_activations">
        <code>
          /partners/
          {"<PARTNER_ID>"}
          /devices
        </code>
      </a>{" "}
      endpoint.
    </p>
    <p>
      If you try to create a token for a user with none of your modules
      activated you will get a <code>E_MODULE_NOT_ACTIVATED</code> error.
    </p>
    <h3>
      <Anchor text="SMS flow" />
    </h3>
    <p>
      You can obtain a token from our users by sending them an SMS with a
      validation code that allows you to request the users authorization to
      access their data.
    </p>
    <p>Obtaining a token via this flow involves 4 distinct steps.</p>
    <p>
      First, you must collect the Sencrop user email via your own UI (remember
      to require the email they used to subscribe to Sencrop).
    </p>
    <p>
      Then, create a token request. This will trigger an SMS to the user with a
      6 chars authorization code.
    </p>
    <p>
      Finally ask users for that code and call our token claim endpoint. It will
      provide you a token allowing you to act on the behalf of that user.
    </p>
    <h4>
      <Anchor text="Requesting a token" />
    </h4>
    <p>
      To request a token just call the following endpoint with your API
      application id and secret:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_TOKEN_REQUEST}
    </SyntaxHighlighter>
    <p>This will send a SMS to the user with an authorization code.</p>
    <h4>
      <Anchor text="Creating a token" />
    </h4>
    <p>
      To create the token just call the following endpoint with your API
      application id and secret:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_TOKEN_CLAIM}
    </SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>
      {SENCROP_TOKEN_CLAIM_PAYLOAD}
    </SyntaxHighlighter>
    <p>
      That token allows your to access the user data through the API.{" "}
      <Link href="/guide">
        <a>See our API guide</a>
      </Link>{" "}
      for more information on its usage.
    </p>
    <p>
      The full endpoints documentation can be found in the{" "}
      <Link href="/reference">
        <a>API reference</a>
      </Link>{" "}
      under the partners tag.
    </p>
    <h2>
      <Anchor text="Listing modules activations" />
    </h2>
    <p>
      At some point, you will want to know who activated your modules on the
      Sencrop application and for which devices. You can do so by using the
      following endpoint:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_PARTNER_DEVICES}
    </SyntaxHighlighter>
    <SyntaxHighlighter language="javascript" style={docco}>
      {SENCROP_PARTNER_DEVICES_PAYLOAD}
    </SyntaxHighlighter>
    <p>You will probably need to check the following values:</p>
    <ul>
      <li>
        <strong>devices ids</strong>: The <code>items</code> property contains
        the list of the returned devices ids. You can access to those devices in
        the <code>devices</code> property which is the hash of the actual
        devices.
      </li>
      <li>
        <strong>devices names</strong>: the name a user gave to its device can
        be found at path <code>devices[deviceid].contents.name</code>.
      </li>
      <li>
        <strong>devices identifications</strong>: a human readable unique id
        (actually printed on the device itsef) that users can use for every
        support requests can be found at path{" "}
        <code>devices[deviceid].identification</code>.
      </li>
      <li>
        <strong>devices models</strong>: the device model id can be found at{" "}
        <code>devices[deviceid].modelId</code>
        and the actual model data at <code>models[modelId]</code>.
      </li>
      <li>
        <strong>devices access</strong>: contains the various access to the
        devices. You want to review the <code>partner</code> type accesses in
        order to know which modules were activated for this device (see at path{" "}
        <code>devices[deviceId].accessPeriods[type=partner].moduleId</code>
        .). You probably want to look at the <code>delegatorId</code> which
        tells you the <code>userId</code> of the user that activated the module
        on this device. Beware that a <code>endDate</code>
        can be present in those access. In this case, you will only have access
        to the data in the date range formed with
        <code>startDate</code>. Also note that a <code>parameters</code>
        property is available to get back the eventual parameters added by the
        users when activating the module on their device.
      </li>
      <li>
        <strong>users</strong>: you can user the <code>users</code> hash to pick
        up informations on the user behind the <code>delegatorId</code>. You
        will probably pick up their email in order to
        <a href="#delegation_flows">generate tokens</a> with the module flow to
        access the data they shared with you.
      </li>
      <li>
        <strong>organisations</strong>: and finally, you may want to know which
        organisations a user is part of by looking in the{" "}
        <code>organisations</code> hash corresponding to the{" "}
        <code>organisationId</code> found at path
        <code>users[delegatorId].organisationsIds</code>.
      </li>
    </ul>
    <h2>
      <Anchor text="Manage partner parameters" />
    </h2>
    <p>
      Dependending on your Sencrop modules you may need to setup some parameters
      to the devices on which your modules were activated. By example, if you
      have an activation workflow:
    </p>
    <SyntaxHighlighter language="bash" style={docco}>
      {CURL_SENCROP_PARTNER_PARAMETERS}
    </SyntaxHighlighter>
  </Layout>
);

export default Partners;
