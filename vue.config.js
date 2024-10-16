const path = require("path");
const ReplaceAppIdPlugin = require("./build/replaceAppIdPlugin.js");

module.exports = {
  configureWebpack: {
    plugins: [new ReplaceAppIdPlugin()],
  },
  transpileDependencies: ["@dcloudio/uni-ui"],
  devServer: {
    watchOptions: {
      ignored: path.resolve(__dirname, "src/manifest.json"), // 忽略 node_modules 目录
      aggregateTimeout: 300, // 减少频繁重启
      poll: 1000, // 控制轮询间隔
    },
  },
};
