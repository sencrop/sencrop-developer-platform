import React, { useEffect } from "react";
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";

const DOM_ID = "swagger-ui";
const swaggerUrl = "https://api.sencrop.com/v1/openAPI?mutedParameters=X-APP-Version&mutedParameters=X-SDK-Version&mutedParameters=X-API-Version";

const Swagger = () => {
  useEffect(() => {
    SwaggerUIBundle({
      url: swaggerUrl,
      dom_id: `#${DOM_ID}`,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset.slice(1)
      ],
      plugins: [SwaggerUIBundle.plugins.DownloadUrl],
      layout: "StandaloneLayout"
    });
  }, []);
  return <div id={DOM_ID} />;
};

export default Swagger;
