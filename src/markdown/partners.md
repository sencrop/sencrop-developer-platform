---
path: "/partners"
title: "Partners API"
position: 2
---

# Partners API

The Sencrop API allows a simpler authorization delegation process for its partners program.

The partners API requires you to contact us before being allowed to use it. To do so, please [create an account](https://app.sencrop.com/register) and [contact us then](mailto:api@sencrop.com).

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


## Listing modules activations

At some point, you will want to know who activated your modules on the Sencrop application and for which devices. You can do so by using the following endpoint:

> ### ⚠️**Warning**
> 
> **Note that this endpoint is paginated with limit and start parameters. You should check the total returned and see if there is more page to retrieve.**

```bash
curl -X GET "https://api.sencrop.com/v1/partners/<PARTNER_ID>/devices?limit=10&start=0" \
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>"
```

```js
{
    "total": 28,
    "items": [
        785,
        // ...
    ],
    "devices": {
        "785": {
            "id": 785,
            "hasBeenReplaced": false,
            "previousDevicesIds": [],
            "settings": {
                "patchSmallRainFall": true
            },
            "accessPeriods": [
                {
                    "id": 390294,
                    "authorId": 1,
                    "granteeId": 1926,
                    "sharingOrganisationId": 1,
                    "userId": 22,
                    "delegatorId": 1,
                    "organisationId": 19,
                    "moduleId": 2,
                    "parameters": {
                        "userEmail": "software@sencrop.com",
                        "organisationName": "Sencrop",
                        "externalIdentifier": "RC001223"
                    },
                    "type": "partner",
                    "startDate": "2021-01-01T00:00:00.000Z"
                }
            ],
            "modelId": 7,
            "identification": "RC001223",
            "serial": "20343F",
            "calibrations": {},
            "contents": {
                "name": ""
            },
            "location": {
                "latitude": 50.7261,
                "longitude": 3.12117,
                "altitude": 83,
                "precision": 1,
                "satellites": 6,
                "source": "gps"
            },
            "status": {
                "firmware": "0.1.12",
                "signal": 0,
                "lqi": "Excellent",
                "battery": 3040,
                "lastLocationDate": "2020-10-26T15:57:04.000Z",
                "lastMoveDate": "2020-07-02T12:58:47.000Z",
                "lastStatusUpdateDate": "2021-06-30T08:05:28.000Z",
                "lastRebootDate": "2018-10-20T14:07:42.000Z"
            }
        },
        // ...
    },
    "devicesStatuses": {
        "785": {
            "id": 785,
            "contents": {
                "firmware": "0.1.12",
                "lqi": "Excellent",
                "battery": 3040,
                "latitude": 50.7261,
                "longitude": 3.12117,
                "altitude": 83,
                "locationPrecision": 1,
                "locationSatellites": 6,
                "lastLocationDate": "2020-10-26T15:57:04.000Z",
                "lastMoveDate": "2020-07-02T12:58:47.000Z",
                "lastStatusUpdateDate": "2021-06-30T08:05:28.000Z",
                "lastRebootDate": "2018-10-20T14:07:42.000Z"
            }
        },
        // ...
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
    },
    "users": {
        "1": {
            "id": 1,
            "locale": "fr-FR",
            "timeZone": "Europe/Paris",
            "organisationsIds": [],
            "roles": [],
            "signupType": "unknown",
            "emailVerified": true,
            "contents": {
                "firstname": "Software",
                "lastname": "Sencrop",
                "email": "software@sencrop.com",
                "locale": "fr-FR",
                "timeZone": "Europe/Paris"
            },
            "creationDate": "2018-02-21T10:02:00.000Z",
            "lastModificationDate": "2021-02-05T17:07:04.000Z"
        },
        // ...
    },
    "organisations": {
        "1": {
            "id": 1,
            "uuid": "69e2f9cb-d883-11e9-8486-024fe6a5d49c",
            "creationDate": "2018-02-21T10:02:01.000Z",
            "lastModificationDate": "2021-06-30T07:36:05.000Z",
            "ownersIds": [],
            "features": [],
            "isNetwork": false,
            "contents": {
                "name": "Sencrop",
                "identification": "2333",
                "locale": "fr-FR",
                "timeZone": "Europe/Paris",
                "type": "company"
            },
            "places": {
                "1": {
                    "id": 1,
                    "placeId": 1,
                    "organisationId": 1,
                    "type": "principal"
                },
                "21305": {
                    "id": 21305,
                    "placeId": 21305,
                    "organisationId": 1,
                    "type": "principal"
                },
                "23015": {
                    "id": 23015,
                    "placeId": 23015,
                    "organisationId": 1,
                    "type": "principal"
                }
            }
        },
        // ...
    },
    "places": {
        "1": {
            "id": 1,
            "creationDate": "2018-07-19T12:46:21.000Z",
            "lastModificationDate": "2021-06-30T07:36:06.000Z",
            "addressLocalized": "-, - Lille, France",
            "contents": {
                "line1": "-",
                "city": "Lille",
                "zip": "-",
                "country": "FR",
                "latitude": 50.6319,
                "longitude": 3.0575
            }
        },
    // ...
    }
}
```

You will probably need to check the following values:

- **devices ids**: The `items` property contains the list of the returned devices ids. You can access to those devices in the devices property which is the hash of the actual devices.
- **devices names**: the name a user gave to its device can be found at path `devices[deviceid].contents.name`.
- **devices identifications: a human readable unique id (actually printed on the device itsef) that users can use for every support requests can be found at path `devices[deviceid].identification`.
- **devices models**: the device model id can be found at `devices[deviceid].modelId` and the actual model data at `models[modelId]`.
- **devices access**: contains the various access to the devices. You want to review the partner type accesses in order to know which modules were activated for this device (see at path `devices[deviceId].accessPeriods[type=partner].moduleId.`). You probably want to look at the `authorId` which tells you the `userId` of the user that activated the module on this device. Beware that a `endDate` can be present in those access. In this case, you will only have access to the data in the date range formed with `startDate`. Also note that a `parameters` property is available to get back the eventual parameters added by the users when activating the module on their device.
- **users**: you can user the users hash to pick up informations on the user behind the authorId. You will probably pick up their email in order to [generate tokens](#delegation-flows) with the module flow to access the data they shared with you.
- **organisations**: and finally, you may want to know which organisations a user is part of by looking in the `organisations` hash corresponding to the `organisationId` found at path `users[authorId].organisationsIds`.


## Delegation flows

Getting access to device data is done through a delegation mechanism: you have to "impersonate" the users to get access to their data. The prerequisite is that the user must have activated at least one of your modules.

This endpoint allows you to create tokens for this impersonation, from the [email addresses you got earlier](#listing-modules-activations).


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
If you try to create a token for a user with none of your modules activated you will get a `E_MODULE_NOT_ACTIVATED` error.  

## Access device data

From there, use the endpoints as described in the [guide](/guide) to access device data:
- hourly / daily data is probably the most useful for you.
- geoqueries if you need continuous series, even in the case of missing data.
- raw data.

  > ## ⚠️**Pricing**
  > 
  > **Please note that you can check all your available device with the endpoint /partners/partnerId/devices. This endpoint is free, rather than using the endpoint /devices/{deviceId} for which you will be charged as if you requested the measures. Therefore we would advise you to use the /devices endpoint to first retrieve your device information and filter the response in order to then request only the devices data that you need**

## Manage partner parameters

Dependending on your Sencrop modules you may need to setup some parameters to the devices on which your modules were activated. By example, if you have an activation workflow:

```bash
curl -X POST "https://api.sencrop.com/v1/partners/<PARTNER_ID>}/users/{authorId}/devices/{deviceId}/modules/{moduleId}/parameters" \
  -H "Authorization: Bearer <PARTNER_ACCESS_TOKEN>" \
  -X POST --data '{ "enabled": true }'
```
