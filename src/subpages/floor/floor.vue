<template>
  <view class="container">
    <!-- 负一楼页面 -->
    <view
      class="floor-minus-one"
      :style="{ transform: `translateY(${offsetY}px)` }"
      @touchstart="(e) => onTouchStart(e, 'top')"
      @touchmove="(e) => onTouchMove(e, 'top')"
      @touchend="(e) => onTouchEnd(e, 'top')"
    >
      <view class="floor-content">
        <text>负一楼页面</text>
      </view>
    </view>

    <!-- 当前页面 -->
    <view
      class="current-page"
      :style="{ transform: `translateY(${offsetY}px)` }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <view
        class="floor-loading"
        v-if="!isShowingFloor && offsetY > 0 && offsetY < 150"
      >
        <hcp-loading></hcp-loading>
      </view>
      <view class="page-content">
        <text>当前页面</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: 100,
      startY: 0, // 记录手指触摸开始的 Y 坐标
      moveY: 0, // 当前手指的 Y 坐标
      offsetY: 0, // 页面偏移量，用于控制下拉和弹性位移
      thresholdDown: 150, // 下拉阈值，拉动多少距离后展示负一楼
      thresholdUp: -150, // 上拉阈值，拉动多少距离后隐藏负一楼
      maxPullDown: 300, // 最大下拉距离
      isShowingFloor: false, // 是否正在显示负一楼
    };
  },
  onReady() {
    uni.getSystemInfo({
      success: (result) => {
        this.screenHeight = result.windowHeight;
      },
      fail: (error) => {},
    });
  },
  methods: {
    // 记录初始触摸位置
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
      this.offsetY = this.screenHeight; // 页面固定到一定的显示位置
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
        this.offsetY = this.screenHeight; // 回到负一楼位置
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.floor-minus-one {
  position: absolute;
  top: -100vh; /* 负一楼初始位置在屏幕外 */
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transition: transform 0.3s ease;
}

.current-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  transition: transform 0.3s ease;
  .floor-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.page-content,
.floor-content {
  font-size: 20px;
  color: #333;
}
</style>
