<template>
  <view class="container">
    <scroll-view
      :scroll-y="true"
      :lower-threshold="50"
      @scrolltolower="loadMore"
      @refresh="onRefresh"
      :refreshing="refreshing"
      :style="{ height: '100vh' }"
    >
      <view v-for="item in items" :key="item.id" class="item">
        {{ item.content }}
      </view>
      <view v-if="loadingMore" class="loading">加载更多...</view>
    </scroll-view>
    <view v-if="refreshing" class="refreshing">正在刷新...</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      refreshing: false,
      loadingMore: false,
      page: 1,
    };
  },
  methods: {
    onRefresh() {
      this.refreshing = true;
      this.page = 1; // Reset page to 1
      this.fetchData().then(() => {
        this.refreshing = false;
      });
    },
    loadMore() {
      if (!this.loadingMore) {
        this.loadingMore = true;
        this.page++;
        this.fetchData().then(() => {
          this.loadingMore = false;
        });
      }
    },
    fetchData() {
      return new Promise((resolve) => {
        // 模拟异步请求
        setTimeout(() => {
          const newItems = Array.from({ length: 10 }, (_, index) => ({
            id: this.page * 10 + index,
            content: `Item ${this.page * 10 + index}`,
          }));
          if (this.page === 1) {
            this.items = newItems;
          } else {
            this.items = [...this.items, ...newItems];
          }
          resolve();
        }, 1000);
      });
    },
  },
  mounted() {
    this.onRefresh(); // 初始化数据
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.loading,
.refreshing {
  text-align: center;
  padding: 10px;
}
</style>
