---
path: "/partners"
title: "Partners API"
position: 2
---

# Partners API

The Sencrop API allows a simpler authorization delegation process for its partners program.

The partners API requires you to contact us before being allowed to use it. To do so, please [create an account](https://app.sencrop.com/register) and [contact us then](https://sencrop.typeform.com/to/XzDjNC).

After contacting us, you will get your API credentials (referred to as `<APPLICATION_ID>` and `<APPLICATION_SECRET>` in the code samples) to interact with the partners API endpoint protected via the [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) ([RFC 7617](https://tools.ietf.org/html/rfc7617)).

To use our API, you will benefit from knowing your `<PARTNER_ID>`, we will transmit it to your with your application credentials.

Beware that your application credentials are to be kept secret and stored in a safe way. You must not use it your frontend applications.

Your applications listing will soon be manageable by your side but in the meanwhile, please contact us to renew / disable it. Feel free to ask several application credentials to isolate your applications or environments.

Also note that once issued, we cannot access to your application secret so take care to not loose it.

## Issuing a partner token
Some partners API endpoints requires you to issue a token (referred to as `<PARTNER_ACCESS_TOKEN>`) for your own account to authenticate via the bearer authentication mechanism ([RFC 6750](https://tools.ietf.org/html/rfc6750.html#section-2.1)).

```bash
curl 'https://api.sencrop.com/v1/oauth2/token' \
  -u '<APPLICATION_ID>:<APPLICATION_SECRET>' \
  -X POST --data '{"grant_type": "client_credentials", "scope": "user"}' \
  -H 'Content-Type: application/json'
```

```js
{
    "access_token": "<PARTNER_ACCESS_TOKEN>",
    "token_type": "bearer",
    "expires_in": 1500015046639,
    "refresh_token": "<PARTNER_REFRESH_TOKEN>"
}
```
As for application credentials, this token must remain confidential and stored in a secure way.

If your organization owns Sencrop devices, you should now be able to access it via our API. You can use your `<PARTNER_ACCESS_TOKEN>` directly in our API reference or follow the API Guide if not done yet to play around with your data.

Otherwise, you can ask our users to access their own devices with the below described delegation flows.

If you want to retrieve your `<PARTNER_ID>` or `<USER_ID>` you can run the following command to reach your user profile:

```bash
curl 'https://api.sencrop.com/v1/me' \
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>" \
  -L
```

Then your `<PARTNER_ID>` will be in the `organisationId` field.  

Do not forget to concatenate the `token_type` and the `access_token` when using the token in the Authorization header. (eg. `"Authorization: Bearer xxxxx"`)


## Delegation flows

You can obtain a token from our users via 2 distinct flows currently, the SMS flow or the module flow:

### Module flow

This flow allows you to directly create tokens for our users. The prerequisite is that the user must have activated at least one of your modules on their Sencrop application.

```bash
curl 'https://api.sencrop.com/v1/oauth2/token' \
  -u '<APPLICATION_ID>:<APPLICATION_SECRET>' \
  -X POST --data '{"grant_type": "module", "email": "user@example.com", "scope": "user"}' \
  -H 'Content-Type: application/json'
```

```js
{
    "access_token": "<PARTNER_ACCESS_TOKEN>",
    "token_type": "bearer",
    "expires_in": 1555927705753,
    "refresh_token": "<PARTNER_REFRESH_TOKEN>"
}
```
To see the users that enabled one of your modules, your can use the [/partners/<PARTNER_ID>/devices](#listing-modules-activations) endpoint.

If you try to create a token for a user with none of your modules activated you will get a `E_MODULE_NOT_ACTIVATED` error.  

## Listing modules activations

At some point, you will want to know who activated your modules on the Sencrop application and for which devices. You can do so by using the following endpoint:

> ## ⚠️**Warning**
> 
> **Note that this endpoint is paginated with limit and start parameters. You should check the total returned and see if there is more page to retrieve.**

```bash
curl -X GET "https://api.sencrop.com/v1/partners/<PARTNER_ID>/devices?limit=10&start=0" \
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>"
```

```js
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
```

You will probably need to check the following values:

- **devices ids**: The `items` property contains the list of the returned devices ids. You can access to those devices in the devices property which is the hash of the actual devices.
- **devices names**: the name a user gave to its device can be found at path `devices[deviceid].contents.name`.
- **devices identifications: a human readable unique id (actually printed on the device itsef) that users can use for every support requests can be found at path `devices[deviceid].identification`.
- **devices models**: the device model id can be found at `devices[deviceid].modelId` and the actual model data at `models[modelId]`.
- **devices access**: contains the various access to the devices. You want to review the partner type accesses in order to know which modules were activated for this device (see at path `devices[deviceId].accessPeriods[type=partner].moduleId.`). You probably want to look at the `delegatorId` which tells you the `userId` of the user that activated the module on this device. Beware that a `endDate` can be present in those access. In this case, you will only have access to the data in the date range formed with `startDate`. Also note that a `parameters` property is available to get back the eventual parameters added by the users when activating the module on their device.
- **users**: you can user the users hash to pick up informations on the user behind the delegatorId. You will probably pick up their email in order to [generate tokens](#delegation-flows) with the module flow to access the data they shared with you.
- **organisations**: and finally, you may want to know which organisations a user is part of by looking in the `organisations` hash corresponding to the `organisationId` found at path `users[delegatorId].organisationsIds`.

## Manage partner parameters

Dependending on your Sencrop modules you may need to setup some parameters to the devices on which your modules were activated. By example, if you have an activation workflow:

```bash
curl -X POST "https://api.sencrop.com/v1/partners/<PARTNER_ID>}/users/{delegatorId}/devices/{deviceId}/modules/{moduleId}/parameters" \
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>" \
  -X POST --data '{ "enabled": true }'
```
