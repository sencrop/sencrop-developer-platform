
import React, { Component } from 'react';
import {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} from "swagger-ui-dist"

const DOM_ID = "swagger-ui"

class Swagger extends Component {
  componentDidMount() {
    const swaggerUrl = process.env.SWAGGER_URL;
    const ui = SwaggerUIBundle({
      url:  swaggerUrl,
      dom_id: `#${ DOM_ID }`,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset.slice(1)
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    })
  }
  render() {
    return (
      <div>
        <div id={DOM_ID} />
      </div>
    );
  }
}

export default Swagger;
