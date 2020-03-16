module.exports = {
  siteMetadata: {
    title: `Bring super powers to farmers! - Sencrop Developers Platform`,
    description: `Welcome to the Sencrop Developer Platform!   Build new farming practices by using our API!`,
    author: `@sencrop`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: "markdown-pages"
      }
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `20`,
              removeAccents: true
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Muli:400,500,600,700,800,400italic,500italic,600italic,700italic,800italic"
          ]
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Seecrop FAQ`,
        short_name: `FAQ`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/sencrop-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `20`,
              removeAccents: true
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    "gatsby-plugin-react-leaflet",
    `gatsby-plugin-netlify` // make sure to put last in the array
  ]
};
