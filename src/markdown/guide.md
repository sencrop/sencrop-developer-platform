---
path: "/guide"
title: "API Guide"
position: 1
---

# API Guide

The Sencrop API allows you to retrieve our users informations and create value on top of it.

In this guide we discuss some design choices in order to help you grasp our API internals quicker.

## First contact

You can simply hit the Sencrop API by simply opening our ping endpoint in your browser:
https://api.sencrop.com/v1/ping

You probably noticed we are using the https protocol so that informations transiting between your systems and the Sencrop ones remain confidential.

You can also use the command line to ping our API with the help of curl:

```bash
curl https://api.sencrop.com/v1/ping
# Answers: {"pong":"pong"}
```
## Get your token

Most of our API requires you to pass a token via the Bearer HTTP mecanism. To interact with our servers, you will need to choose a way to get one.

### Via OAuth2

We plan to integrate OAuth authentication that will provide you a way to obtain a token from our users. Subscribe to our mailing list to be informed of the OAuth2 support.

### Via the Partners API

The Partners API allows you to ask our users an access to their data in a privilegied way. You first need to meet us to get that access.

### Via the Sencrop app

Otherwise, for your own account, you can use our API with your own token, generated on our application, for testing purposes.

To grab a token, just connect to the [Sencrop Web Application](https://app.sencrop.com/) and log in.

We will soon provide you an interface to manage your applications tokens but in the meanwhile, you can open the developer console and copy/paste this snippet:

```js
console.log({
  token: 'Bearer ' + window.getToken(),
  userId: window.getUserId(),
})
// Prints: { token: 'Bearer xxxxxxxx', userId: 1664 }
```

Great! You can now access your Sencrop data with the help of your token. The user id will also help since almost every protected endpoints requires your to fill it.

Starting here, you can directly jump to the [API reference](/reference) and insert your token right in the Authorization field of the protected endpoints.

Or just continue your journey through our API guide!

## Listing your devices

Before retrieving your data you may want to simply list your own Sencrop Devices:

```bash
curl 'https://api.sencrop.com/v1/users/1664/devices'  -H "Authorization: Bearer xxxxx"
```
The result will look like this:

```js
{
  "items": [
    33,
    114711
  ],
  "devices": {
    33: {
      "id": "33",
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
      "id": 114711,
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
    "33": {
      "id": 33,
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
```

The `items` property tells you the collection of devices you can access to. While the `devices` hash allows your to pickup the devices details.

You may ask why using that format. It allows our payload to avoid repating the same informations several times while not requiring you to use a specific JSON loader. It also allows us to significantly reduce our app memory footprint by easing hash merges accross our various states.

## Reading raw device data

Your devices regularly send meteoroligical data to our servers. You can get their direct output by simply requesting the following endpoint:

```bash
curl "https://api.sencrop.com/v1/users/1664/devices/33/data/raw?size=100&beforeDate=2017-10-10T00:00:00Z&measures=RELATIVE_HUMIDITY,TEMPERATURE"  -H "Authorization: Bearer xxxxx"
```

The result will look like this:

```js
[
  {
    "date": "2017-10-09T23:54:07.000Z",
    "type": "RELATIVE_HUMIDITY",
    "value": 65.2,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:54:07.000Z",
    "type": "TEMPERATURE",
    "value": 15.100000000000001,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:39:07.000Z",
    "type": "RELATIVE_HUMIDITY",
    "value": 66.7,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:39:07.000Z",
    "type": "TEMPERATURE",
    "value": 14.8,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:24:06.000Z",
    "type": "TEMPERATURE",
    "value": 14.9,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:24:06.000Z",
    "type": "RELATIVE_HUMIDITY",
    "value": 65.7,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:09:07.000Z",
    "type": "RELATIVE_HUMIDITY",
    "value": 67.4,
    "discarded": false
  },
  {
    "date": "2017-10-09T23:09:07.000Z",
    "type": "TEMPERATURE",
    "value": 14.5,
    "discarded": false
  },
  {
    "date": "2017-10-09T22:54:06.000Z",
    "type": "TEMPERATURE",
    "value": 15,
    "discarded": false
  },
  {
    "date": "2017-10-09T22:54:06.000Z",
    "type": "RELATIVE_HUMIDITY",
    "value": 64.2,
    "discarded": false
  }
]
```

The `date`, `type` and `value` fields are self explanatory. The discarded field is a bit more special, he means that our algorithm detected that the measure was wrong. It can be due to many different issues (hardware failure, bad installation, network failures etc...).

Note that the `size` query parameter is mandatory and limited to a few values. Check out the API reference for more information.

## Reading device data

The raw data is cool but you may want a bit more insight on the data you retrieve.

For this purpose we brought to you two kind of endpoints.

```bash
# Get hourly aggregated data for two days
curl "https://api.sencrop.com/v1/users/1664/devices/33/data/hourly?beforeDate=2017-10-07T07:34:32.000Z&days=7&measures=WIND_DIRECTION,WIND_SPEED"  -H "Authorization: Bearer xxxxx"
# Get daily aggregated data for two days
curl "https://api.sencrop.com/v1/users/1664/devices/33/data/daily?beforeDate=2017-10-07T07:34:32.000Z&days=90&measures=WIND_DIRECTION,WIND_SPEED"  -H "Authorization: Bearer xxxxx"
```
The result will look like this:

```js
{
  "item": 33,
  "devices": {
    "33": {
      "id": 33,
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
  "measures": {
    "interval": "1h",
    "data": [{
      "key": 1507186800000,
      "WIND_SPEED": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 262
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_SPEED": {
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
      "WIND_SPEED": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 222
      },
      "docCount": 6
    }]
  }
}
```

Each measures are aggregated depending on its nature. The wind, temperature, relative humidity are simple averages while the rain is a sum instead. The wind direction is a vector sum.

Note that the `days` query parameter is mandatory and limited to a few values. Check out the API reference for more information.

## Adaptive scale data

Here, what matters for you is to get data for a given period. In this case, we automatically choose the right scale in order for you to get best insights with no performance hint.

```bash
# Get device statistics for two days
curl "https://api.sencrop.com/v1/users/1664/devices/33/statistics?startDate=2017-01-01T00:00:00.000Z&endDate=2017-02-01T00:00:00.000Z&measures=WIND_DIRECTION,WIND_SPEED&patched=false"  -H "Authorization: Bearer xxxxx"
Note the patched parameter that allows your to retrieve only not patched data (ie only real device data). Setting it to true or not specifying it will not return extrapolated leaking data refills.
```

The result will look like this:

```js
{
  "item": 33,
  "devices": {
    "33": {
      "id": 33,
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
  "measures": {
    "interval": "1d",
    "data": [{
      "key": 1507186800000,
      "WIND_SPEED": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 262
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_SPEED": {
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
      "WIND_SPEED": {
        "value": 15.5
      },
      "WIND_DIRECTION": {
        "value": 222
      },
      "docCount": 6
    }]
  }
}
```

## Geobased data

The geobased data provides your insights around a given position instead of a single device. Indeed, during its usage, a device may be moved or shutdown. Also, some devices can provide you rain measures while others will instead give you rain data.

For that purpose, you may prefer get available data for a given place in your Sencrop network.

```bash
# Get geobased statistics
curl "https://api.sencrop.com/v1/users/1664/statistics?startDate=2017-01-01T00:00:00.000Z&endDate=2017-02-01T00:00:00.000Z&latitude=37.234894&longitude=-115.81082&measures=WIND_SPEED,RAIN_FALL"  -H "Authorization: Bearer xxxxx"
# Get geobased fixed scale data
curl "https://api.sencrop.com/v1/users/1664/data/hourly?beforeDate=2017-01-01T00:00:00.000Z&days=3&latitude=37.234894&longitude=-115.81082&measures=WIND_SPEED,RAIN_FALL"  -H "Authorization: Bearer xxxxx"
```

The result will look like this:

```js
{
  "measures": {
    "interval": "1d",
    "data": [{
      "key": 1507186800000,
      "WIND_SPEED": {
        "precision": 80,
        "value": 15.5
      },
      "RAIN_FALL": {
        "precision": 99,
        "value": 3
      },
      "docCount": 4
    },
    {
      "key": 1507190400000,
      "WIND_SPEED": {
        "precision": 80,
        "value": 19.416666666666668
      },
      "RAIN_FALL": {
        "precision": 99,
        "value": 0.5
      },
      "docCount": 12
    },
    { '...': '...' },
    {
      "key": 1507359600000,
      "WIND_SPEED": {
        "precision": 80,
        "value": 15.5
      },
      "RAIN_FALL": {
        "precision": 99,
        "value": 0
      },
      "docCount": 6
    }]
  }
}
```

You can notice a new property called `precision` that tells you how precise is the result. Indeed, the devices on which are based the data may not be at the exact position you provided but instead in a ten kilometers ring around it.

This precision field goes from 0 to 100 and is based on statistical studies we made upfront. That precision may vary depending on the kind of measure. It may also change since we will probably reshape our statistical algorithms for more sharp results.

Note that the `days` query parameter is mandatory and limited to a few values. Check out the API reference for more information.

## Time buckets
Various measures are aggregated into time buckets. The buckets are computed according to the user's timezone per default. Here are the various intervals you may encounter:

- **15m**: the bucket key will point the start of the buckets with the first one beeing the first 15 minutes part of fours containing the given start date,
- **30m**: the bucket key will point the start of the buckets with the first one beeing the first 30 minutes part of fours containing the given start date,
- **hour**: the bucket key will point the start of days hours inside the given time interval,
- **week**: the bucket key will point the start of weeks between the provided start and end dates (starting on sunday),
- **month**: the bucket key will point the start of months for each month between the provided start and end dates,
- **year**: the bucket key will point the start of years for each year between the provided start and end dates.

You have to be aware of the fact that time buckets are aligned on days/months/years boundaries in the user's timezone. So, if you need to get the current year statistics for a french user, you need to set `startDate`/`endDate` values in the `Europe/Paris` timezone.

For instance, with JavaScript and using the [MomentJS library](https://momentjs.com/) you would end up with some code looking like the following:

```js
import API from 'sencrop-js-api-client';
import moment from 'moment-timezone';

API.getUserDeviceStatistics({
  userId: 86,
  deviceId: 33,
  authorization: 'Bearer yolo-token',
  startDate: moment().tz('Europe/Paris').startOf('year').toISOString(),
  endDate: moment().tz('Europe/Paris').endOf('year').toISOString(),
  measures: ['TEMPERATURE'],
}, {
  // Here goes any Axios request configuration override
  // See: https://github.com/mzabriskie/axios#request-config
  timeout: 40000,
})
.then({ data } => {
  console.log(data);
});
```

The result will look like this:

```js
{
  "item": 33,
  "devices": {
    "33": {
      "id": 33,
      "accessPeriods": [
        {
          "id": 10279,
          "deviceId": 33,
          "userId": 86,
          "type": "owner",
          "startDate": "2018-02-14T15:15:00.000Z"
        }
      ],
      "modelId": 7,
      "userId": 1217,
      "organisationId": 1061,
      "previousDevicesIds": [
        1308
      ],
      "identification": "RC001664",
      "serial": "ABBACA",
      "contents": {
        "name": ""
      }
    }
  },
  "measures": {
    "interval": "month",
    "data": [
      {
        "key": 1512082800000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1514761200000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1517439600000,
        "TEMPERATURE": {
          "value": 0.7823753330795595
        },
        "docCount": 7881
      },
      {
        "key": 1519858800000,
        "TEMPERATURE": {
          "value": 5.929323899371062
        },
        "docCount": 8904
      },
      {
        "key": 1522533600000,
        "TEMPERATURE": {
          "value": 12.416400462962963
        },
        "docCount": 8640
      },
      {
        "key": 1525125600000,
        "TEMPERATURE": {
          "value": 14.189615931721207
        },
        "docCount": 4218
      },
      {
        "key": 1527804000000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1530396000000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1533074400000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1535752800000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1538344800000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1541026800000,
        "TEMPERATURE": {},
        "docCount": 0
      },
      {
        "key": 1543618800000,
        "TEMPERATURE": {},
        "docCount": 0
      }
    ]
  }
}
```

Beware that not aligning on the user's timezone may lead to incomplete buckets at boundaries of the returned data. Also, if you retrieve a bucket for the current month, you only have a partial bucket for that month since it has not ended yet. In the above result you can see that the may month is not terminated yet so the bucket has a limited number of measures (see the `docCount` property) and the following buckets are empty since they represent future months.

## Units
The API returns values in fixed units. We use the [international system of units](https://en.wikipedia.org/wiki/International_System_of_Units) where applicable so that you can convert it on you side with ease. Here are the various units we use:

- **RAIN_FALL**: pluviometry measured in [millimeters (mm)](https://en.wikipedia.org/wiki/Rain#Measurement)
- **TEMPERATURE**: temperature measured in [degree Celsius (°C)](https://en.wikipedia.org/wiki/Celsius)
- **RELATIVE_HUMIDITY**: relative humidity measured in [percentage (%)](https://en.wikipedia.org/wiki/Relative_humidity#Definition),
- **WIND_SPEED/WIND_GUST**: wind measured in kilometers [per hour (km·h−1)](https://en.wikipedia.org/wiki/Kilometres_per_hour),
- **WIND_DIRECTION**: wind direction angle with the North in [angular degrees (°)](https://en.wikipedia.org/wiki/Degree_(angle)) within a 0 to 360 range (360 excluded), for instance, a value of 0 means a wind directed to the North and coming from the South,
- **WET_TEMPERATURE**: wet bulb temperature in [degree Celsius (°C)](https://en.wikipedia.org/wiki/Wet-bulb_temperature),
- **LEAF_WETNESS**: amount of wetness time in minutes.

Please note that the old counter intuitive name (`WIND_MAX`, `WIND_MEAN`, `RH_AIR_H1`, `TEMP_AIR_H1`, `RAIN_TIC`) are still supported but deprecated. We will probably remove those measures in a near future.

## Limits
Since we are in an early alpha publication of this API, we do not yet provide feedback on rate limitations and how to prevent it. You will not reach the limit until you make a hundred calls per minutes which should be sufficient.

Contact us if you think you need a more intensive access to the data in the meanwhile.

## What's next ?
So you read it all? Impressive! You are now in the best conditions to use our API! You can try it interactively with our [API reference](/reference) or directly dive into code with our JavaScript SDK. Check out our [open-source tools](/tools)!
