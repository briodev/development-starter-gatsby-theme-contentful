
const withDefaults = require(`./utils/default-options`)

// exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
//   const {basePath} = withDefaults(themeOptions)
// };

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const {basePath} = withDefaults(themeOptions)
  const slabTemplate = require.resolve(`./src/templates/slab-template`);

  const {data} = await graphql(`
    query {
      allContentfulSlab {
        edges {
          node {
            page {
              slug
            }
          }
        }
      }
    }
  `);

  if (data.errors) {
    reporter.panic(data.errors);
  }

  data.allContentfulSlab.edges.forEach(edge => {
    const slug = edge.node.page.slug
    actions.createPage({
      path: `${basePath}/${slug}`,
      component: require.resolve(slabTemplate),
      context: { slug: slug },
    })
  })

  // Create index page
  // createPage({
  //   path: basePath,
  //   component: PostsTemplate,
  //   context: {
  //     posts
  //   }
  // });
};