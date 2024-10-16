<template>
  <view>
    <text>接口</text>
    <button type="primary" @click="fetchAPI">接口请求啦啦啦</button>
    <button type="warning" @click="getUserInfo">获取用户信息</button>
    <uni-calendar
      :insert="true"
      :lunar="true"
      :start-date="'2019-3-2'"
      :end-date="'2040-5-20'"
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
    fetchAPI() {
      uni.request({
        url: "https://api.apihubs.cn/holiday/get",
        method: "GET",
        data: {
          year: "2021",
        },
        success: (res) => {
          console.log("res", res);
        },
        fail: (err) => {
          console.log("err", err);
        },
      });
    },
    getUserInfo() {
      uni.getUserInfo({
        success: (res) => {
          console.log("res", res);
        },
        fail: (err) => {
          console.log("err", err);
        },
      });
    },
  },
};
</script>

<style scoped></style>
