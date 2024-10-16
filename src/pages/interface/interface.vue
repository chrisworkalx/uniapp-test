<template>
  <view>
    <text>接口</text>
    <uni-calendar
      :insert="true"
      :lunar="true"
      :start-date="'2019-3-2'"
      :end-date="'2019-5-20'"
      @change="change"
    />
  </view>
</template>

<script>
export default {
  methods: {
    change(...rest) {
      console.log("rest", rest);
      uni.showToast({
        title: "按钮被点击了！",
        icon: "none",
      });
    },
  },
};
</script>

<style scoped></style>
