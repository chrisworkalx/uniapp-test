const ReplaceAppIdPlugin = require("./build/replaceAppIdPlugin.js");

module.exports = {
  configureWebpack: {
    plugins: [new ReplaceAppIdPlugin()],
  },
};
