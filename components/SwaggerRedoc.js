
import React, { Component } from 'react';
import { color } from '../ui/Colors';
import { RedocStandalone } from 'redoc';

class Swagger extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RedocStandalone
        specUrl="https://api.sencrop.com/v1/openAPI"
        options={{
          theme: { colors: { main: color('green') } },
        }}
      />
    );
  }
}

export default Swagger;
