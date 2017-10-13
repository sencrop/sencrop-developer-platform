
import React, { Component } from 'react';
import {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} from "swagger-ui-dist"

console.log({
  SwaggerUIStandalonePreset
})

const DOM_ID = "swagger-ui"

class Swagger extends Component {
  componentDidMount() {
    const ui = SwaggerUIBundle({
      url: "/static/swagger.api.json",
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
