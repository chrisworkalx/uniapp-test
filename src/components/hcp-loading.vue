<template>
  <view class="loading">
    <view class="dot"></view>
    <view class="dot"></view>
    <view class="dot"></view>
  </view>
</template>

<script>
export default {
  name: "hcp-loading",
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100vw;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    background-color: #999;
  }
  40% {
    background-color: #f8f8f8;
  }
}
</style>
