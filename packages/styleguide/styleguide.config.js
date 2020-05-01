const path = require("path")
const glob = require("glob")

module.exports = {
  components: function () {
    return glob
      .sync(path.resolve(__dirname, "components/**/*.tsx"))
      .filter(function (module) {
        return /\/[A-Z]\w*\.tsx$/.test(module)
      })
  },

  title: "Themed App's Components Library",
  /** This is necessary because styleguide overrides any webpack's output config */
  dangerouslyUpdateWebpackConfig: (config) => {
    config.output = {
      path: path.join(__dirname, `../public/build`),
      filename: "styleguide.js",
      chunkFilename: "[name].js",
    }
    return config
  },

  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
  propsParser: require("react-docgen-typescript").withDefaultConfig({
    propFilter: { skipPropsWithoutDoc: true },
  }).parse,
  theme: "./styles/dark-theme.ts",
}

module.exports = {}
