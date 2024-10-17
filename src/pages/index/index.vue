<template>
  <view class="content">
    <hcp-header></hcp-header>
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
</template>

<script>
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
  },
  methods: {
    goToNewsPage() {
      uni.navigateTo({
        url: "/subpages/news/news",
      });
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
</style>
