<template>
  <hcp-scroll-page title="商品页" ref="scrollRef" @refresh="handleRefresh">
    <template #top-banner>
      <view class="top-banner"></view>
    </template>
    <template #search-area>
      <!-- <hcp-vant-drop-down
        :options="menuOptions"
        @change="handleChange"
      ></hcp-vant-drop-down> -->
      <view class="search-area"></view>
    </template>

    <template #refresh-area>
      <view class="content">
        <view v-for="item in 40" :key="item" class="content-item"
          >Item {{ item }}</view
        >
      </view>
    </template>
    <!-- <template #extra-area>
      <view
        style="
          height: 1600px;
          background-color: green;
          position: relative;
          z-index: 1000000;
        "
      >
      </view>
    </template> -->
  </hcp-scroll-page>
</template>

<script>
export default {
  name: "shop",
  data() {
    return {
      menuOptions: ["选项1", "选项2", "选项3"],
    };
  },
  onPageScroll({ scrollTop }) {
    // console.log("scrollTop--父组件", scrollTop);
    this.$refs.scrollRef.handlePageScroll(scrollTop);
  },
  methods: {
    handleRefresh(close) {
      console.log("close", close);
      console.log("刷新");
      setTimeout(() => {
        console.log("准备关闭");
        close();
      }, 3000);
    },
    handleChange(selectedItem) {
      console.log("Selected item:", selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-banner {
  height: 300px;
  background-color: skyblue;
}

.search-area {
  height: 180rpx;
  background-color: #f99;
  //   background-color: transparent;
}
.content {
  padding: 10px;
  //   background-color: #f3f3f3;
  .content-item {
    height: 50px;
    border-bottom: 1px solid #eee;
  }
}
</style>
