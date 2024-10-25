<template>
  <view class="scroll-container">
    <!-- 自定义导航栏 -->
    <slot name="navbar">
      <view
        class="custom-bar"
        :style="{
          backgroundColor: customBarBgColor,
          height: stickyNodeTop + 'px',
          paddingTop: safeStatusBarHeight + 'px',
        }"
      >
        <view class="custom-bar-back flex-1">
          <uni-icons type="left" size="30" @click="goBack"></uni-icons>
        </view>
        <view
          class="custom-bar-title flex-1"
          :style="{
            opacity: textOpacity,
          }"
        >
          <text>导航栏标题</text>
        </view>
        <view class="flex-1"><!--占位符--></view>
      </view>
    </slot>
    <!-- top banner -->
    <slot name="top-banner">
      <view class="custom-navbar"> </view>
    </slot>
    <view class="custom-filter-area" :style="{ top: stickyNodeTop + 'px' }">
      <slot name="search-area"></slot>
    </view>
    <!-- 页面内容，模拟内容滚动 -->
    <scroll-view
      class="custom-scroll-view"
      :scroll-y="isOpenScrollY"
      :lower-threshold="100"
      :refresher-threshold="100"
      refresher-enabled
      :refresher-triggered="triggered"
      refresher-background="#f8f8f8"
      @scrolltoupper="handleScrollToUpper"
      @scrolltolower="handleScrollToLower"
      @scroll="handleScroll"
      @refresherpulling="handleRefresherPulling"
      @refresherrefresh="handleRefresherRefresh"
      @refresherrestore="handleRefresherRestore"
      @refresherabort="handleRefresherAbort"
    >
      <slot name="refresh-area">
        <view class="content">
          <view v-for="item in 40" :key="item" class="content-item"
            >Item {{ item }}</view
          >
        </view>
      </slot>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      customBarBgColor: "transparent", // 初始背景为透明
      safeStatusBarHeight: 0,
      textOpacity: 0,
      weixinButtonInfo: {},
      stickyNodeTop: 0,
      triggered: false,
      isOpenScrollY: false, //是否开启scroll竖向滚动
    };
  },
  // onLoad() {
  //   setTimeout(() => {
  //     this.triggered = true;
  //   }, 1000);
  // },
  onReady() {
    const serviceInfo = uni.getSystemInfoSync();
    const statusBarHeight = serviceInfo.statusBarHeight;
    const weixinButtonInfo = uni.getMenuButtonBoundingClientRect();
    this.weixinButtonInfo = weixinButtonInfo;
    this.safeStatusBarHeight = statusBarHeight;
    this.stickyNodeTop = weixinButtonInfo.top + weixinButtonInfo.height;
  },
  onPageScroll() {
    const query = uni.createSelectorQuery().in(this);
    query
      .select(".custom-filter-area")
      .boundingClientRect((data) => {
        if (data.top - 2 <= this.stickyNodeTop) {
          if (this.customBarBgColor != "#fff") {
            this.customBarBgColor = "#fff"; //背景色
            this.textOpacity = 1; //文字
            this.isOpenScrollY = true; //开启scroll竖向滚动
          }
        } else {
          if (this.customBarBgColor !== "transparent") {
            this.customBarBgColor = "transparent"; //背景透明
            this.textOpacity = 0; //文字透明
            this.isOpenScrollY = false; //关闭scroll竖向滚动
          }
        }
      })
      .exec();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    handleScrollToUpper() {
      //滚动到顶部/左边
      console.log("滚动到顶部/左边");
      this.$emit("scrolltoupper");
    },
    handleScrollToLower() {
      //滚动到底部/右边
      console.log("滚动到底部/右边");
      this.$emit("scrolltolower");
    },
    handleScroll(e) {
      // 滚动中
    },
    handleRefresherRestore() {
      // 刷新被复位
      console.log("刷新被复位");
      this.$emit("refresherrestore");
      this.triggered = "restore"; // 需要重置
    },
    handleRefresherAbort() {
      // 刷新被中止
      console.log("刷新被中止");
      this.$emit("refresherabort");
    },
    handleRefresherPulling() {
      // 刷新被下拉
      // console.log("刷新被下拉");
      this.$emit("refresherpulling");
    },
    handleRefresherRefresh() {
      // 刷新被触发
      console.log("刷新被触发");
      this.triggered = true;
      setTimeout(() => {
        this.triggered = false;
      }, 2000);
      this.$emit("refresh", () => {
        this.triggered = false;
      });
    },
  },
};
</script>

<style lang="scss">
.flex-1 {
  flex: 1;
}
.scroll-container {
  background-color: #fff;
  padding-bottom: var(--window-bottom);

  .custom-bar {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    z-index: 10;
    width: 100%;
    &-back {
      font-size: 16rpx;
    }
    &-title {
      text-align: center;
      font-size: 30rpx;
    }
  }

  /* 自定义导航栏样式 */
  .custom-navbar {
    height: 200px;
    width: 100%;
    background-color: #f99;
    transition: background-color 0.3s;
  }

  .custom-filter-area {
    position: sticky;
    left: 0;
    height: 100px;
    width: 100%;
    background-color: #ccc;
    z-index: 10;
  }

  .custom-scroll-view {
    height: 100vh;
    .content {
      padding: 10px;
      background-color: #f3f3f3;
      .content-item {
        height: 50px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
