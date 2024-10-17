<template>
  <view>
    <text>组件</text>
    <view class="uni-primary">主色</view>
    <view class="uni-success">成功色</view>
    <view class="uni-warning">警告色</view>
    <view class="uni-error">错误色</view>
    <view>
      <text v-for="item in list" :key="item">{{ item }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
    this.getGlobalData();
  },
  methods: {
    getGlobalData() {
      const gData = getApp().globalData;
      console.log(gData);
      this.list = Object.freeze(gData.list || []);
    },
  },
};
</script>

<style scoped></style>
