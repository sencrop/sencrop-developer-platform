
import React from "react"

class NotFoundTemplate extends React.Component {
  render() {
    const { lang } = this.props.pageContext;

    return (
      <p>404 {lang}</p>
    )
  }
}

export default NotFoundTemplate