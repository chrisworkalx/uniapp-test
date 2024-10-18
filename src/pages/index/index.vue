<template>
  <view>
    <view class="content">
      <hcp-header></hcp-header>
      <view>
        <view>vuex---start</view>
        <text>{{ count }} | </text>
        <text>{{ getCount }} | </text>
        <text>{{ getName }} | </text>
        <view>vuex---over</view>
        <button @click="increment">increment</button>
        <button @click="decrement">decrement</button>
        <button @click="cstIncrement(5)">自定义增加</button>
        <button @click="decrementAlia">别名</button>
        <view>modules---counter2</view>
        <text>{{ counterGetCount2 }} |</text>
        <text>{{ counterStateCount }}</text> |
        <text>{{ counterGetterCount }}</text>
        <view>modules--counter</view>
        <text>{{ counterGetCount }}</text>
        <button @click="counterIncrementAsync">
          counter模块action别名方法
        </button>
        <button @click="incrementOtherModule(80)">更新其他模块</button>
      </view>
      <image class="logo" src="/static/logo.png"></image>
      <view>
        <text class="title">{{ title }}</text>
      </view>
      <navigator
        url="/pages/componentInstance/componentInstance"
        open-type="switchTab"
        hover-class="navigator-hover"
      >
        跳转到组件页面
      </navigator>
      <navigator
        url="/subpages/image/image"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        跳转到图像页面
      </navigator>
      <view @click="goToNewsPage">
        <text>去新闻页面</text>
      </view>
    </view>

    <canvas
      id="captureCanvas"
      canvas-id="captureCanvas"
      class="capture-canvas"
    ></canvas>

    <button @click="drawSharePageToCanvas" open-type="share">
      Capture and Share
    </button>
    <button type="primary" @click="gotoOtherMiniProgram">去其他小程序</button>
  </view>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { executeOnPlatform } from "@/utils/util";
export default {
  data() {
    return {
      title: "Hello uniapp",
    };
  },
  onLoad() {
    //获取页面堆栈信息
    const pages = getCurrentPages();
    console.log("pages", pages);
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
    executeOnPlatform("h5", () => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 2000);
    });
    executeOnPlatform("mp-weixin", () => {
      setTimeout(() => {
        uni.showToast({
          title: "下拉刷新",
          icon: "none",
        });
        uni.stopPullDownRefresh();
      }, 2000);
    });
  },
  // 开启分享好友
  // onShareAppMessage() {
  //   return {
  //     title: "Welcome to My Mini Program!",
  //     path: "/pages/index/index", // The path to the shared page
  //     imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg", // Custom share image
  //   };
  // },
  //开启分享朋友圈
  onShareTimeline() {
    return {
      title: "Check out this awesome app!",
      query: "id=123&name=abc", // Query parameters to pass with the share
      imageUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg", // Custom share image
    };
  },
  methods: {
    ...mapActions("counter", {
      counterIncrementAsync: "incrementAsync",
      incrementOtherModule: "incrementOtherModule",
    }),
    //mapActions和mapMutations都可以别名处理
    ...mapActions(["incrementAsync"]),
    ...mapMutations({
      decrementAlia: "decrement", //别名
    }),
    goToNewsPage() {
      uni.navigateTo({
        url: "/subpages/news/news",
      });
    },
    // 获取当前页面内容并绘制到 canvas
    drawSharePageToCanvas() {
      const self = this;
      console.log("开启绘制分享");
      const query = uni.createSelectorQuery().in(self);
      query
        .select(".content") // 选择要绘制的内容区域
        .boundingClientRect()
        .exec((res) => {
          console.log("res", res);
          const contentRect = res[0];
          const { width, height } = contentRect;
          const ctx = uni.createCanvasContext("captureCanvas", self);

          // 设置背景色和内容绘制
          ctx.setFillStyle("#fff");
          ctx.fillRect(0, 0, width, height);

          // 绘制文字（也可以绘制图片等其他元素）
          ctx.setFontSize(20);
          ctx.setFillStyle("#333");
          ctx.fillText("这是一个分享页面", 10, 30);

          console.log("ctx", ctx);

          // 结束绘制
          ctx.draw(true, (...rest) => {
            console.log("绘制完成---", rest);
            this.generateImage();
          });
        });
    },

    // 生成图片地址
    generateImage() {
      console.log("开始生成缓存地址---");
      uni.canvasToTempFilePath(
        {
          canvasId: "captureCanvas",
          success: (res) => {
            this.imagePath = res.tempFilePath; // 保存图片地址
            console.log("图片生成成功：", this.imagePath);

            // 调用分享逻辑
            this.shareToFriend(this.imagePath);
          },
          fail: (err) => {
            console.error("图片生成失败：", err);
          },
        },
        this
      );
    },
    shareToFriend(imagePath) {
      uni.share({
        provider: "weixin", // 支持微信分享
        sence: "WXSceneSession", // 分享到会话
        type: 2, // 分享图片
        imageUrl: imagePath, // 图片路径
        success: () => {
          uni.showToast({
            title: "分享成功",
            icon: "success",
          });
        },
        fail: (err) => {
          console.error("分享失败：", err);
          uni.showToast({
            title: "分享失败",
            icon: "error",
          });
        },
      });
    },
    gotoOtherMiniProgram() {
      uni.navigateToMiniProgram({
        appId: "wx069326dfb5ca0b76", // 替换为其他小程序的AppID
        path: "pages/404/404", // 替换为其他小程序的页面路径
        envVersion: "trial", // 体验版
        success: () => {
          console.log("跳转到其他小程序成功");
        },
      });
    },
    increment() {
      this.$store.dispatch("increment"); // 调用 action
    },
    decrement() {
      this.$store.dispatch("decrement"); // 调用 action
    },
    cstIncrement(n) {
      this.incrementAsync(n);
    },
  },
  computed: {
    ...mapGetters(["getCount"]),
    ...mapState({
      getName: (state) => state.name,
    }),
    ...mapState("counter", {
      counterGetCount: (state) => state.count,
    }), // 使用命名空间映射状态
    ...mapState("counter2", {
      counterGetCount2: (state) => state.count,
    }),
    count() {
      return this.$store.getters.getCount; // 使用 getter 获取状态
    },
    counterGetterCount() {
      console.log("this.$store", this.$store);
      return this.$store.getters["counter2/getCount"]; // 使用命名空间获取状态
    },
    counterStateCount() {
      return this.$store.state.counter2.count; // 使用命名空间获取状态
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.capture-canvas {
  position: absolute;
  left: -100%;
  height: -100%;
  background-color: transparent;
  width: 300rpx;
  height: 300rpx;
  z-index: -10;
}
</style>
