<template>
  <view class="bubble-container">
    <view class="bubble" :animation="animationData">
      {{ textList[currentTextIndex] }}
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      textList: ["回收", "换礼品", "拍卖"], // 气泡文字数组
      currentTextIndex: 0, // 当前显示的文字索引
      animationData: {}, // 动画数据
      intervalId: null, // 定时器ID
    };
  },
  onReady() {
    // 创建动画实例
    this.animation = uni.createAnimation({
      duration: 1000, // 动画持续时间1秒
      timingFunction: "ease", // 动画的缓动函数
    });

    // 开始定时任务，定时执行动画
    this.startAnimationLoop();
  },
  methods: {
    // 开始动画循环
    startAnimationLoop() {
      this.intervalId = setInterval(() => {
        // 执行动画，逐渐缩小到消失
        this.animation.scale(0).opacity(0).step();
        this.animationData = this.animation.export();

        // 一秒后重置气泡，并显示下一组文字
        setTimeout(() => {
          this.currentTextIndex =
            (this.currentTextIndex + 1) % this.textList.length;

          // 还原气泡大小和透明度
          this.animation.scale(1).opacity(1).step({ duration: 0 });
          this.animationData = this.animation.export();
        }, 1000);
      }, 2000); // 每两秒切换一次（包括1秒动画时间和1秒展示时间）
    },
  },
  onUnload() {
    // 页面卸载时，清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
};
</script>

<style>
.bubble-container {
  position: relative;
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bubble {
  padding: 10px 20px;
  background-color: #f0c040;
  border-radius: 20px;
  font-size: 18px;
}
</style>
