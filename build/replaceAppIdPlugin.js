const path = require("path");
const replace = require("replace-in-file");

// 根据环境变量获取对应的 AppID 配置
const env = process.env.NODE_ENV;
const envConfig = require(`../env.${env}.js`);

//获取平台信息
const platform = process.env.UNI_PLATFORM;
const isWeXinPlatform = platform === "mp-weixin";

let hasExecutedBeforeCompile = false;
let hasExecutedDone = false;
function replaceInFile(isReplace = true) {
  //读取文件流
  const manifestPath = path.resolve(__dirname, "../src/manifest.json");
  const appId = isReplace ? envConfig.APPID : "";
  return new Promise((resolve, reject) => {
    replace({
      files: manifestPath,
      from: /"mp-weixin"\s*:\s*{[^}]*?"appid"\s*:\s*"([^"]*)"/g, // 匹配 mp-wexin 中的 appid
      to: (match, $1) => {
        return match.replace(/"appid"\s*:\s*"[^"]*"/, `"appid": "${appId}"`); // 替换为新的 appid
      },
    })
      .then(() => {
        console.log(`已替换 AppID 为: ${appId}`);
        resolve();
      })
      .catch((err) => {
        console.error("替换 AppID 出错:", err);
        reject(err);
      });
  });
}

/**
 *  主要目的动态替换 manifest.json 中的占位符
 */
class ReplaceAppID {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(
      "ReplaceAppID",
      async (compilation, callback) => {
        if (isWeXinPlatform) {
          try {
            if (hasExecutedBeforeCompile) {
              console.log("首次构建已经完成，不再重复执行");
              return callback();
            }
            hasExecutedBeforeCompile = true;
            await replaceInFile();
            callback();
          } catch (error) {
            callback(error);
          }
        } else {
          callback();
        }
      }
    );
    compiler.hooks.done.tapAsync(
      "ReplaceAppID",
      async (compilation, callback) => {
        if (isWeXinPlatform) {
          try {
            if (hasExecutedDone || env === "development") {
              console.log("开发环境或者插件逻辑已执行完成，不再重复执行");
              return callback(); // 继续构建流程
            }
            hasExecutedDone = true;
            await replaceInFile(false);
            callback();
          } catch (error) {
            callback(error);
          }
        } else {
          callback();
        }
      }
    );
  }
}

module.exports = ReplaceAppID;
