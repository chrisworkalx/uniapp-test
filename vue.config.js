const path = require("path");
const ReplaceAppIdPlugin = require("./build/replaceAppIdPlugin.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 根据你的组件目录修改
      },
    },
    //生产环境开启压缩
    optimization: {
      minimize: true, // 启用代码压缩
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: process.env.NODE_ENV === "production", // 仅在生产环境中删除 console.log
              drop_debugger: process.env.NODE_ENV === "production", // 仅在生产环境中删除 debugger
            },
            output: {
              comments: process.env.NODE_ENV !== "production", // 仅在开发环境中保留注释
            },
          },
          extractComments: false, // 不提取注释
        }),
      ],
    },
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
