/**
 * 根据平台执行对应逻辑
 * @param {string} platform - 平台名称 (如 'h5', 'mp-weixin', 'app-plus')
 * @param {Function} callback - 匹配平台时执行的回调函数
 */
export function executeOnPlatform(platform, callback) {
  if (process.env.UNI_PLATFORM === platform) {
    callback && callback(); // 如果匹配平台，则执行回调函数
  }
}
