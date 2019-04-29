import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const PageTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`

export default PageTemplate
