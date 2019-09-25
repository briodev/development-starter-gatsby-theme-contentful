const withDefaults = require(`./utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)

  return {
    siteMetadata: {
      title: `BrioDev Starter Theme`,
      description: `A simple starter contentful image and SEO`,
      keywords: ['BrioDev', 'Gatsby Blog', 'Gatsby Theme' ],
      siteUrl: 'https://brio.dev',
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/briodev`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/briodev`,
        },
      ],
      twitter: {
        site: '@briodev',
        creator: '@briodev' //This can be overwritten in SEO by the author twitter account
      },
      author: `BrioDev - https://brio.dev`,
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: options.contentful.spaceId,
          // Learn about environment variables: https://gatsby.dev/env-vars
          accessToken: options.contentful.accessToken,
          downloadLocal: true,
        },
      },
    ],
  }
}