---
path: "/tools"
title: "Tools"
position: 4
---

# Tools

## Swagger/OpenAPI Definition
You can [download](https://api.sencrop.com/v1/openAPI) our Swagger/OpenAPI definition so that you can use it in your own tools.

For instance, you may like to import it [into Postman](https://www.getpostman.com/docs/postman/collections/data_formats) or automatically [create an API client](https://swagger.io/swagger-codegen/) for your favorite programming language.

## JavaScript SDK
To use our API writing less code, you can also use our JavaScript SDK.

To install it, you must have NodeJS and NPM installed:

```bash
npm install --save sencrop-js-api-client
```

Then in your client application:

```js
import API from 'sencrop-js-api-client';

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
```
You may want to check our [SDK source on GitHub](https://github.com/sencrop/sencrop-js-api-client). It is also a good place to report issues or feature requests with our SDK.