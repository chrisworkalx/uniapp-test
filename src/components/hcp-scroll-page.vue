<template>
  <view class="custom-scroll-container">
    <!-- 自定义导航栏 -->
    <slot name="navbar">
      <view
        class="custom-bar"
        :style="{
          backgroundColor: customBarBgColor,
          height: stickyNodeTop + 'px',
          paddingTop: weixinButtonInfo.top + 'px',
        }"
      >
        <view class="custom-bar-back flex-1">
          <uni-icons
            type="left"
            size="30"
            :color="backIconColor"
            @click="goBack"
            v-if="isShowBack"
          ></uni-icons>
        </view>
        <view
          class="custom-bar-title flex-1"
          :style="{
            opacity: textOpacity,
          }"
        >
          <text>{{ title }}</text>
        </view>
        <view class="flex-1"><!--占位符--></view>
      </view>
    </slot>
    <!-- top banner -->
    <view class="custom-top-banner-box">
      <slot name="top-banner"> </slot>
    </view>
    <view class="custom-filter-area" :style="{ top: stickyNodeTop + 'px' }">
      <slot name="search-area"></slot>
    </view>
    <!-- 页面内容，模拟内容滚动 -->

    <view class="custom-scroll-sticky">
      <scroll-view
        class="custom-scroll-view"
        scroll-y
        :lower-threshold="100"
        :refresher-threshold="0"
        :refresher-enabled="isCanRefresh"
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
        <slot name="refresh-area"> </slot>
      </scroll-view>
    </view>
    <slot name="extra-area"></slot>
  </view>
</template>

<script>
export default {
  name: "hcp-scroll-page",
  props: {
    title: {
      type: String,
      default: "",
    },
    isShowBack: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      customBarBgColor: "transparent", // 初始背景为透明
      textOpacity: 0,
      weixinButtonInfo: {},
      stickyNodeTop: 0,
      triggered: false,
      isOpenScrollY: false, //是否开启scroll竖向滚动
      backIconColor: "#fff", //返回按钮颜色
      scrollStickyTop: 0,
      isCanRefresh: true, //是否开启下拉刷新

      query: null,
      customSearchNodeInfo: null,
      customBannerNodeInfo: null,
      startScrollTop: 0, // 记录滚动开始时的 scrollTop 值

      startY: 0, // 记录手指触摸开始的 Y 坐标
      moveY: 0, // 当前手指的 Y 坐标
      offsetY: 0, // 页面偏移量，用于控制下拉和弹性位移
      thresholdDown: 150, // 下拉阈值，拉动多少距离后展示负一楼
      thresholdUp: -150, // 上拉阈值，拉动多少距离后隐藏负一楼
      maxPullDown: 300, // 最大下拉距离,
      isShowingFloor: false, // 是否展示负一楼
    };
  },
  async onReady() {
    const weixinButtonInfo = uni.getMenuButtonBoundingClientRect();

    const query = uni.createSelectorQuery().in(this);

    this.query = query;
    const customSearchNodeInfo = await this.getSelectNodePosition(
      query,
      ".custom-filter-area"
    );
    const customBannerNodeInfo = await this.getSelectNodePosition(
      query,
      ".custom-top-banner-box"
    );
    this.customSearchNodeInfo = customSearchNodeInfo;
    this.customBannerNodeInfo = customBannerNodeInfo;

    this.weixinButtonInfo = weixinButtonInfo;
    this.stickyNodeTop = weixinButtonInfo.top + weixinButtonInfo.height;
    this.startScrollTop =
      customSearchNodeInfo.height + customBannerNodeInfo.height;
  },
  methods: {
    getSelectNodePosition(query, selectorName) {
      return new Promise((res) => {
        query
          .select(selectorName)
          .boundingClientRect((data) => {
            res(data);
          })
          .exec();
      });
    },
    handlePageScroll(scrollTop) {
      const leftBannerScrollHeight = scrollTop + this.stickyNodeTop;

      if (leftBannerScrollHeight >= this.customBannerNodeInfo.height) {
        console.log("触碰到边界了");
        console.log("scrollTop", scrollTop);
        if (this.customBarBgColor != "#fff") {
          this.customBarBgColor = "#fff"; //背景色
          this.textOpacity = 1; //文字
          //   this.isOpenScrollY = true; //开启scroll竖向滚动
          this.backIconColor = "#000"; //返回按钮颜色
        }
        this.scrollStickyTop =
          this.stickyNodeTop + this.customSearchNodeInfo.height;
      } else {
        if (this.customBarBgColor !== "transparent") {
          this.customBarBgColor = "transparent"; //背景透明
          this.textOpacity = 0; //文字透明
          //   this.isOpenScrollY = false; //关闭scroll竖向滚动
          this.backIconColor = "#fff"; //返回按钮颜色
        }
        this.scrollStickyTop = 0;
      }
    },
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
      if (e.detail.scrollTop === 0) {
        // this.isOpenScrollY = false;
        // this.isCanRefresh = true;

        uni.showToast({
          title: "滚动到顶部",
          icon: "none",
          mask: true,
        });
      } else {
        // this.isCanRefresh = false;
      }
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
      this.triggered = true;
      this.$emit("refresh", () => {
        this.triggered = false;
      });
    },
    onTouchStart(e, type) {
      if (type === "top") {
        this.isShowingFloor = true;
      } else {
        this.isShowingFloor = false;
      }
      this.moveY = 0;
      this.startY = e.touches[0].pageY;
    },
    // 触摸移动过程中更新页面位置
    onTouchMove(e) {
      let distance = e.touches[0].pageY;
      const diffDistance = distance - this.startY;
      this.moveY = diffDistance;
      // 控制下拉负一楼的逻辑
      if (diffDistance > 0 && !this.isShowingFloor) {
        // 如果用户向下拉并且还没展示负一楼，控制页面下拉效果
        if (diffDistance <= this.maxPullDown) {
          this.offsetY = diffDistance / 2; // 弹性下拉
        }
      }

      // 控制上拉隐藏负一楼的逻辑
      if (diffDistance < 0 && this.isShowingFloor) {
        // 如果用户向上拉并且负一楼已经显示，控制页面上拉效果

        if (diffDistance >= this.thresholdUp) {
          this.offsetY = diffDistance / 2;
        }
      }
    },
    // 触摸结束后，判断是否要显示或隐藏负一楼
    onTouchEnd() {
      this.$nextTick(() => {
        if (this.moveY >= this.thresholdDown && !this.isShowingFloor) {
          this.showMinusOneFloor(); // 显示负一楼
        } else if (this.moveY <= this.thresholdUp && this.isShowingFloor) {
          this.hideMinusOneFloor(); // 隐藏负一楼
        } else {
          this.resetPosition(); // 回弹到初始位置
        }
      });
    },
    // 显示负一楼页面
    showMinusOneFloor() {
      this.isShowingFloor = true;
      this.offsetY = 44;
    },
    // 隐藏负一楼页面
    hideMinusOneFloor() {
      this.isShowingFloor = false;
      this.offsetY = 0; // 页面回到原位置
    },
    // 回弹到初始位置
    resetPosition() {
      if (!this.isShowingFloor) {
        this.offsetY = 0; // 回到初始位置
      } else {
        this.offsetY = 44;
      }
    },
  },
};
</script>

<style lang="scss">
.flex-1 {
  flex: 1;
}
.custom-scroll-container {
  background-color: transparent;
  padding-bottom: var(--window-bottom);

  .custom-bar {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    z-index: 1000;
    width: 100%;
    box-sizing: border-box;
    &-back {
      font-size: 16rpx;
    }
    &-title {
      text-align: center;
      font-size: 30rpx;
    }
  }

  .custom-filter-area {
    position: sticky;
    left: 0;
    width: 100%;
    background-color: transparent;
    z-index: 10;
  }

  .custom-scroll-sticky {
    .custom-scroll-view {
      background-color: #f80;
      //   width: 100%;
      //   position: sticky;
      //   z-index: 2;
      //   left: 0;
      //   top: 0;
    }
  }
}
</style>
