const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const mdPageTemplate = path.resolve(`src/templates/page-md.js`)
  const mdxPageTemplate = path.resolve(`src/templates/page-mdx.js`)

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      allMdx {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  // result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.frontmatter.path,
  //     component: mdPageTemplate,
  //     context: {}, // additional data can be passed via context
  //   })
  // });
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: mdxPageTemplate,
      context: {}, // additional data can be passed via context
    })
  })
}