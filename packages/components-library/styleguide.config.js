const webpackConfig = require("react-scripts/config/webpack.config")

module.exports = {
  webpackConfig: webpackConfig,
  components: "src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").parse,
  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
}
