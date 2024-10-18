<template>
  <view class="navbar" :style="{ marginTop: mt + 'px' }">
    <view class="nav-item" @click="goBack">
      <text class="nav-text">返回</text>
    </view>
    <text class="title">{{ title }}</text>
    <view class="nav-item" @click="onRightClick">
      <text class="nav-text">右侧按钮</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    mt: {
      type: Number,
      default: 44,
    },
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    onRightClick() {
      this.$emit("rightClick");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #f8f8f8;
  padding: 0 10px;
}
.nav-item {
  cursor: pointer;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
</style>
