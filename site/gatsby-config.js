require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
      title: `BrioDev Starter Theme`,
      description: `A simple starter blog with image and SEO`,
      keywords: ['BrioDev', 'Gatsby Blog', 'Gatsby Theme' ],
      siteUrl: 'https://brio.dev',
      twitter: {
        site: '@briodev',
        creator: '@briodev' //This can be overwritten in SEO by the author twitter account
      },
      author: `BrioDev - https://brio.dev`,
    },
    plugins: [
      {
        resolve: "@briodev/gatsby-theme-blog",
        options: {
          contentPath: "content/blog-posts",
          basePath: "/blog",
          tagsPath: "/categories"
        }
      },
      {
        resolve: "@briodev/gatsby-theme-contentful-image",
        options: {
          basePath: "/slabs",
          contentful: {
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
          }
        }
      },

    ]
}