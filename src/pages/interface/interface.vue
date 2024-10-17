<template>
  <view>
    <text>接口</text>
    <image :src="imgSrc" mode="aspectFill"></image>
    <button type="primary" @click="fetchAPI">接口请求啦啦啦</button>
    <button type="primary" @click="getUserInfo">获取用户信息</button>
    <button type="primary" @click="getLogin">授权登录</button>
    <button type="primary" @click="getSetting">获取设置</button>
    <button type="primary" @click="setStorageSync">同步设置缓存</button>
    <button type="primary" @click="setStorage">异步设置缓存</button>
    <button type="primary" @click="getStorageSync">同步获取缓存</button>
    <button type="primary" @click="getStorage">异步获取缓存</button>
    <button type="warn" @click="removeStorageSync">同步移除缓存</button>
    <button type="warn" @click="removeStorage">异步移除缓存</button>
    <button type="primary" @click="getStorageInfo">
      异步获取当前 storage 的相关信息
    </button>
    <button type="primary" @click="getStorageInfoSync">
      同步获取当前 storage 的相关信息
    </button>
    <button type="warn" @click="clearStorage">
      异步清除 storage 的相关信息
    </button>
    <button type="warn" @click="clearStorageSync">
      同步清除 storage 的相关信息
    </button>
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
  data() {
    return {
      imgSrc: "",
    };
  },
  methods: {
    show(title) {
      uni.showToast({
        title,
        icon: "none",
      });
    },
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
          this.imgSrc = res.userInfo.avatarUrl;
        },
        fail: (err) => {
          console.log("err", err);
        },
      });
    },
    setStorage() {
      uni.setStorage({
        key: "storage_key",
        data: "hello",
        success: () => {
          console.log("success");
          this.show("设置异步缓存成功！");
        },
      });
    },
    setStorageSync() {
      uni.setStorageSync("storage_key_sync", "setStorageSync");
      this.show("设置同步缓存成功！");
    },
    getStorageSync() {
      const res = uni.getStorageSync("storage_key_sync");
      console.log("res", res);
      this.show("获取同步缓存成功！" + res);
    },
    getStorage() {
      uni.getStorage({
        key: "storage_key",
        success: (res) => {
          console.log("res", res);
          this.show("获取异步缓存成功！" + res.data);
        },
      });
    },
    removeStorageSync() {
      uni.removeStorageSync("storage_key_sync");
      this.show("移除同步缓存成功！");
    },
    removeStorage() {
      uni.removeStorage({
        key: "storage_key",
        success: () => {
          console.log("success");
          this.show("移除异步缓存成功！");
        },
      });
    },
    getStorageInfo() {
      uni.getStorageInfo({
        success: (res) => {
          console.log("res", res);
          this.show("获取异步缓存信息成功！" + JSON.stringify(res));
        },
      });
    },
    getStorageInfoSync() {
      const res = uni.getStorageInfoSync();
      console.log("res", res);
      this.show("获取同步缓存信息成功！" + JSON.stringify(res));
    },
    clearStorage() {
      uni.clearStorage({
        success: () => {
          console.log("success");
          this.show("清除异步缓存成功！");
        },
      });
    },
    clearStorageSync() {
      uni.clearStorageSync();
      this.show("清除同步缓存成功！");
    },
    getLogin() {
      uni.login({
        provider: "weixin",
        success: (res) => {
          console.log("res", res);
        },
        fail: (err) => {
          console.log("err", err);
        },
      });
    },
    getSetting() {
      uni.getSetting({
        success: (res) => {
          console.log("res", res);
        },
      });
    },
  },
};
</script>

<style scoped></style>
