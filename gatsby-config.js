module.exports = {
  pathPrefix: "",
  // pathPrefix: "/dogecoin.org",
  // assetPrefix: "https://dogecoinorg.github.io/dogecoin.org/",
  siteMetadata: {
    name: "proofof.dog",
    title: "Finacial Freedom for Dogs #proofOfDog",
    description: `Social Justice and Financial Freedom for all Dogs Everywhere`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    { resolve: "gatsby-plugin-react-svg", options: { rule: { include: /assets/ } } },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/js/crypto-signature.js',
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: '/js/wallet-generator.js',
      },
    },
  ],
}
