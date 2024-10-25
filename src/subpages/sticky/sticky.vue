<template>
  <view
    class="scroll-view"
    :style="{
      paddingTop: safeTopHeight + 'px',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }"
  >
    <view class="top">AAAA</view>
    <view
      class="header"
      :style="{
        top: safeTopHeight + 'px',
        height: weixinButtonInfo.height + 'px',
      }"
      >Sticky Header</view
    >
    <view class="content">Content goes here...</view>
    <view class="content2">Content goes here...</view>
    <view class="footer">Footer Content</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      weixinButtonInfo: {},
      safeTopHeight: 0,
      safeRight: 0,
      safeBottom: 0,
    };
  },
  onPageScroll({ scrollTop }) {
    // console.log("scrollTop", scrollTop);
  },
  onReady() {
    // console.log("uni.getSystemInfoSync()", uni.getSystemInfoSync());
    const serviceInfo = uni.getSystemInfoSync();
    // console.log("serviceInfo.safeArea", serviceInfo.safeArea);
    const safeBottom = serviceInfo.safeArea.bottom;
    // console.log("safeBottom", safeBottom);
    const h = serviceInfo.statusBarHeight;
    const serviceWidth = serviceInfo.windowWidth;
    const weixinButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.weixinButtonInfo = weixinButtonInfo;
    this.safeTopHeight = h;
    this.safeBottom = safeBottom;
    this.safeRight =
      serviceWidth - weixinButtonInfo.right + weixinButtonInfo.width + 10;
    this.fixedTop = weixinButtonInfo.top + weixinButtonInfo.height;

    // console.log("this.fixedTop", this.fixedTop);
  },
};
</script>

<style>
.scroll-view {
  background-color: blue;
}
.top {
  height: 80px;
  background-color: orange;
  color: #fff;
}
.header {
  position: sticky;
  top: 0;
  left: 0;
  background: #f80;
  z-index: 1; /* 确保粘性元素在其他元素之上 */
  color: #333;
}
.content {
  height: 800px;
  background-color: #f99;
}
.content2 {
  height: 800px;
  background-color: skyblue;
}
.footer {
  background-color: green;
  color: #fff;
}
</style>
