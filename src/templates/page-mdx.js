import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const PageTemplate = ({ data }) => {
  const { mdx } = data
  const { code } = mdx
  return (
    <Layout>
      <MDXRenderer>{code.body}</MDXRenderer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      code {
        body
      }
      frontmatter {
        path
        title
      }
    }
  }
`

export default PageTemplate
