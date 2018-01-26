import Link from 'next/link'
import Layout from '../components/Layout'

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import js from 'react-syntax-highlighter/dist/languages/javascript'
import docco from 'react-syntax-highlighter/dist/styles/docco'

registerLanguage('javascript', js);

const PING_ENDPOINT = 'https://api.sencrop.com/v1/ping';
const CURL_PING_CODE = `curl ${PING_ENDPOINT}
# Answers: {"pong":"pong"}
`;
const TOKEN_RETRIEVAL_CODE = `console.log({
  token: 'Bearer ' +
    JSON.parse(localStorage.state).user.token,
  userid: JSON.parse(localStorage.state).user.id,
})
// Prints: { token: 'Bearer xxxxxxxx', userId: 1664 }
`;
const CURL_SENCROP_DEVICES_CODE = `curl https://api.sencrop.com/v1/users/1664/devices\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_DEVICES_PAYLOAD = `{
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
  "devicesStatuses": {
    "BI6BA46": {
      "id": "BI6BA46",
      "contents": {
        "latitude": 43.7799,
        "longitude": 1.31287
      }
    },
    "114711": {
      "id": "114711",
      "contents": {
        "latitude": 43.7799,
        "longitude": 1.3128
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
const CURL_SENCROP_RAW_DATA_CODE = `curl "https://api.sencrop.com/v1/users/1664/devices/B16BA4/data/raw?size=100&beforeDate=2017-10-10T00:00:00Z&measures=RH_AIR_H1,TEMP_AIR_H1"\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_RAW_DATA_PAYLOAD = `[
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
const CURL_SENCROP_DATA_CODE = `# Get hourly aggregated data for two days
curl "https://api.sencrop.com/v1/users/1664/devices/B16BA4/data/hourly?beforeDate=2017-10-07T07:34:32.000Z&days=2&measures=WIND_DIRECTION,WIND_MEAN"\
  -H "Authorization: Bearer xxxxx"
# Get daily aggregated data for two days
curl "https://api.sencrop.com/v1/users/1664/devices/B16BA4/data/daily?beforeDate=2017-10-07T07:34:32.000Z&days=2&measures=WIND_DIRECTION,WIND_MEAN"\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_DATA_PAYLOAD = `{
  "models": {
    "8": {
      "id": 8,
      "contents": {
        "name": "Windcrop",
        "conception": "France - Lille",
        "manufacturing": "Europe-France",
        "calibration": "Ok",
        "weight": 3.1
      }
    }
  },
  "devices": {
    "B16BA4": {
      "id": "B16BA4",
      "accessPeriods": [{
        "role": "owner",
        "endDate": "2038-01-19T03:14:07.000Z"
      }],
      "modelId": 8,
      "userId": 1664,
      "identification": "WC666999",
      "contents": {
        "name": "My Windcrop"
      }
    }
  },
  "entry": "B16BA4",
  "measures": {
    "interval": "1h",
    "data": [{
      "key": 1507186800000,
      "WIND_MEAN": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 262
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_MEAN": {
        "value": 19.416666666666668
      },
      "WIND_DIRECTION": {
        "value": 281
      },
      "docCount": 12
    },
    { '...': '...' },
    {
      "key": 1507359600000,
      "WIND_MEAN": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 222
      },
      "docCount": 6
    }]
  }
}
`;
const CURL_SENCROP_STATISTICS_CODE = `# Get device statistics for two days
curl "https://api.sencrop.com/v1/users/1664/devices/B16BA4/statistics?startDate=2017-01-01T00:00:00.000Z&endDate=2017-02-01T00:00:00.000Z&measures=WIND_DIRECTION,WIND_MEAN"\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_STATISTICS_PAYLOAD = `{
  "models": {
    "8": {
      "id": 8,
      "contents": {
        "name": "Windcrop",
        "conception": "France - Lille",
        "manufacturing": "Europe-France",
        "calibration": "Ok",
        "weight": 3.1
      }
    }
  },
  "devices": {
    "B16BA4": {
      "id": "B16BA4",
      "accessPeriods": [{
        "role": "owner",
        "endDate": "2038-01-19T03:14:07.000Z"
      }],
      "modelId": 8,
      "userId": 1664,
      "identification": "WC666999",
      "contents": {
        "name": "My Windcrop"
      }
    }
  },
  "entry": "B16BA4",
  "measures": {
    "interval": "1d",
    "data": [{
      "key": 1507186800000,
      "WIND_MEAN": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 262
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_MEAN": {
        "value": 19.416666666666668
      },
      "WIND_DIRECTION": {
        "value": 281
      },
      "docCount": 12
    },
    { '...': '...' },
    {
      "key": 1507359600000,
      "WIND_MEAN": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 222
      },
      "docCount": 6
    }]
  }
}
`;
const CURL_SENCROP_GEOBASED_CODE = `
# Get geobased statistics
curl "https://api.sencrop.com/v1/users/1664/statistics?startDate=2017-01-01T00:00:00.000Z&endDate=2017-02-01T00:00:00.000Z&latitude=37.234894&longitude=-115.81082&measures=WIND_MEAN,RAIN_TIC"\
  -H "Authorization: Bearer xxxxx"
# Get geobased fixed scale data
curl "https://api.sencrop.com/v1/users/1664/data/hourly?beforeDate=2017-01-01T00:00:00.000Z&days=3&latitude=37.234894&longitude=-115.81082&measures=WIND_MEAN,RAIN_TIC"\
  -H "Authorization: Bearer xxxxx"
`;
const SENCROP_GEOBASED_PAYLOAD = `{
  "measures": {
    "interval": "1d",
    "data": [{
      "key": 1507186800000,
      "WIND_MEAN": {
        "precision": 80,
        "value": 15.5
      },
      "RAIN_TIC": {
        "precision": 99,
        "value": 3
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_MEAN": {
        "precision": 80,
        "value": 19.416666666666668
      },
      "RAIN_TIC": {
        "precision": 99,
        "value": 0.5
      },
      "docCount": 12
    },
    { '...': '...' },
    {
      "key": 1507359600000,
      "WIND_MEAN": {
        "precision": 80,
        "value": 15.5
      },
      "RAIN_TIC": {
        "precision": 99,
        "value": 0
      },
      "docCount": 6
    }]
  }
}
`;

const Index = () => (
  <Layout title={ 'API Guide' } description={
`A simple guide to help you using our API.`.replace(/\n/, '')
  } guide>
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
      by simply opening our ping endpoint
      in your browser:<br/>
      <a href="{PING_ENDPOINT}"
      >{PING_ENDPOINT}</a>
    </p>
    <p>
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
      To interact with our servers, you will
      need to choose a way to get one.
    </p>
    <h3>Via OAuth2</h3>
    <p>
      We plan to integrate OAuth authentication
      that will provide you a way to obtain
      a token from our users. Subscribe to our
      mailing list to be informed of the OAuth2
      support.
    </p>
    <h3>Via the Partners API</h3>
    <p>
      The <Link href="/partners"><a>Partners
      API</a></Link> allows you to ask our
      users an access to their data in a
      privilegied way. You first need to meet
      us to get that access.
    </p>
    <h3>Via the Sencrop app</h3>
    <p>
      Otherwise, for your own account, you
      can use our API with your own token,
      generated on our application, for
      testing purposes.
    </p>
    <p>
      To grab a token, just connect to
      the <a href="http://app.sencrop.com"
      >Sencrop Web Application</a> and log
      in.
    </p>
    <p>
      We will soon provide you an interface
      to manage your applications tokens but
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
      our API guide!
    </p>
    <h2>Listing your devices</h2>
    <p>
      Before retrieving your data you may want
      to simply list your own Sencrop Devices:
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
      The <code>date</code>, <code>type</code>
      and <code>value</code> fields are self explanatory.
      The <code>discarded</code> field is a bit more
      special, he means that our algorithm detected
      that the measure was wrong. It can be due to
      many different issues (hardware failure,
      bad installation, network failures etc...).
    </p>
    <p>
      Note that the `size` query parameter is
      mandatory and limited to a few values.
      Check out the API reference for more
      information.
    </p>
    <h2>Reading device data</h2>
    <p>
      The raw data is cool but you may want a bit
      more insight on the data you retrieve.
    </p>
    <p>
      For this purpose we brought to you two kind
      of endpoints.
    </p>
    <SyntaxHighlighter language="javascript" style={docco}>{
      CURL_SENCROP_DATA_CODE
    }</SyntaxHighlighter>
    <p>The result will look like this:</p>
    <SyntaxHighlighter language="json" style={docco}>{
      SENCROP_DATA_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      Each measures are aggregated depending on
      its nature. The wind, temperature, relative
      humidity are simple averages while the rain
      is a sum instead. The wind direction is a
      vector sum.
    </p>
    <p>
      Note that the `days` query parameter is
      mandatory and limited to a few values.
      Check out the API reference for more
      information.
    </p>
    <h3>Adaptive scale data</h3>
    <p>
      Here, what matters for you is to get
      data for a given period. In this case,
      we automatically choose the right scale
      in order for you to get best insights
      with no performance hint.
    </p>
    <SyntaxHighlighter language="javascript" style={docco}>{
      CURL_SENCROP_STATISTICS_CODE
    }</SyntaxHighlighter>
    <p>The result will look like this:</p>
    <SyntaxHighlighter language="json" style={docco}>{
      SENCROP_STATISTICS_PAYLOAD
    }</SyntaxHighlighter>
    <h2>Geobased data</h2>
    <p>
      The geobased data provides your insights around
      a given position instead of a single device.
      Indeed, during its usage, a device may be moved
      or shutdown. Also, some devices can provide you
      rain measures while others will instead give
      you rain data.
    </p>
    <p>
      For that purpose, you may prefer get available data
      for a given place in your Sencrop network.
    </p>

    <SyntaxHighlighter language="javascript" style={docco}>{
      CURL_SENCROP_GEOBASED_CODE
    }</SyntaxHighlighter>
    <p>The result will look like this:</p>
    <SyntaxHighlighter language="json" style={docco}>{
      SENCROP_GEOBASED_PAYLOAD
    }</SyntaxHighlighter>
    <p>
      You can notice a new property
      called <code>precision</code> that tells
      you how precise is the result. Indeed,
      the devices on which are based the data
      may not be at the exact position you
      provided but instead in a ten kilometers
      ring around it.
    </p>
    <p>
      This precision field goes from 0 to 100
      and is based on statistical studies we
      made upfront. That precision may vary
      depending on the kind of measure. It
      may also change since we will probably
      reshape our statistical algorithms
      for more sharp results.
    </p>
    <p>
      Note that the `days` query parameter is
      mandatory and limited to a few values.
      Check out the API reference for more
      information.
    </p>
    <h2>Limits</h2>
    <p>
      Since we are in an early alpha publication
      of this API, we do not yet provide feedback
      on rate limitations and how to prevent it.
      You will not reach the limit until you make
      a hundred calls per minutes which should be
      sufficient.
    </p>
    <p>
      Contact us if you think you need a more
      intensive access to the data in the
      meanwhile.
    </p>
    <h2>What's next ?</h2>
    <p>
      So you read it all? Impressive! You are
      now in the best conditions to use our
      API! You can try it interactively with
      our <Link href="/reference"><a>API
      reference</a></Link> or directly dive
      into code with our JavaScript SDK.
      Check out our <Link href="/tools"><a>open-source
      tools</a></Link>!
    </p>
  </Layout>
)

export default Index
