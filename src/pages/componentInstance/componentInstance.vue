<template>
  <view>
    <hcp-custom-navbar
      :mt="iStatusBarHeight"
      title="自定义导航栏"
      @rightClick="handleRightClick"
    ></hcp-custom-navbar>
    <text>组件</text>
    <hcp-bubble></hcp-bubble>
    <view class="uni-primary">主色</view>
    <view class="uni-success">成功色</view>
    <view class="uni-warning">警告色</view>
    <view class="uni-error">错误色</view>
    <view>
      <text v-for="item in list" :key="item">{{ item }}</text>
    </view>
    <canvas
      id="myCanvas"
      canvas-id="myCanvas"
      style="width: 300px; height: 300px"
    ></canvas>
    <button @click="exportCanvas" open-type="share" class="share-button">
      导出画布
    </button>
    <navigator
      url="/pages/life/life"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      去生命周期
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      iStatusBarHeight: 0,
    };
  },
  onLoad() {
    this.getGlobalData();
    const h = uni.getSystemInfoSync().statusBarHeight;

    this.iStatusBarHeight = h;
  },
  mounted() {
    this.drawCanvas();
  },
  //开启分享好友 这个方法会覆盖uni.share方法
  // onShareAppMessage() {
  //   return {
  //     title: "Welcome to My Mini Program!",
  //     path: "/pages/index/index", // The path to the shared page
  //     imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg", // Custom share image
  //   };
  // },
  methods: {
    getGlobalData() {
      const gData = getApp().globalData;
      console.log(gData);
      this.list = Object.freeze(gData.list || []);
    },
    drawCanvas() {
      const ctx = uni.createCanvasContext("myCanvas", this);
      ctx.setFillStyle("blue");
      ctx.fillRect(50, 50, 200, 200);
      ctx.draw(true, () => {
        uni.canvasToTempFilePath(
          {
            canvasId: "myCanvas",
            success: (res) => {
              console.log("导出的临时文件路径:", res.tempFilePath);
              const tempFilePath = res.tempFilePath;

              const query = uni.createSelectorQuery().in(this);
              const btn = query
                .select(".share-button")
                .boundingClientRect()
                .exec((res) => {
                  console.log("res", res);
                });
              console.log("btn", btn);
            },
            fail: (err) => {
              console.error("导出失败:", err);
            },
          },
          this
        );
      }); // 绘制画布
    },
    exportCanvas() {
      // 确保绘制完成后再导出
      setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: "myCanvas",
            success: (res) => {
              console.log("导出的临时文件路径:", res.tempFilePath);
              const tempFilePath = res.tempFilePath;
              // 可以在这里使用导出的文件，例如预览或上传
              uni.share({
                provider: "weixin",
                scene: "WXSceneSession",
                type: 2,
                imageUrl: tempFilePath,
                success: function (res) {
                  console.log("success:" + JSON.stringify(res));
                },
                fail: function (err) {
                  console.log("fail:" + JSON.stringify(err));
                },
              });
            },
            fail: (err) => {
              console.error("导出失败:", err);
            },
          },
          this
        );
      }, 100); // 确保有足够时间绘制完成
    },
    handleRightClick() {
      console.log("right click");
    },
  },
};
</script>

<style scoped></style>
