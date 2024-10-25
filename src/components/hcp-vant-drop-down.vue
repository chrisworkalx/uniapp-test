<template>
  <view class="dropdown-menu">
    <view class="dropdown-item" @click="toggleMenu">{{ selectedItem }}</view>
    <view class="fixed-bg" v-if="isOpen"></view>
    <view v-if="isOpen" class="dropdown-list" :animation="animationData">
      <view
        class="dropdown-option"
        v-for="(item, index) in options"
        :key="index"
        @click="selectItem(item)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItem: "请选择",
      animationData: {},
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.startAnimation();
    },
    selectItem(item) {
      this.selectedItem = item;
      this.isOpen = false;
      this.$emit("change", item);
    },
    startAnimation() {
      const animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease",
      });

      if (this.isOpen) {
        animation.opacity(1).translateY(0).step();
      } else {
        animation.opacity(0).translateY(-10).step();
      }

      const animationExportData = animation.export();

      console.log("animationExportData", animationExportData);

      this.animationData = animationExportData;
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  position: relative;
}

.fixed-bg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
  /* display: none; */
}
.dropdown-item {
  cursor: pointer;
  /* border: solid 1px #ddd; */
  box-shadow: 0 0 10px #ddd;
  padding: 20rpx;
  margin-bottom: 4rpx;
}
.dropdown-list {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-top: 0;
  width: 100%;
  z-index: 1000;
}
.dropdown-option {
  padding: 10px;
  cursor: pointer;
}
.dropdown-option:hover {
  background-color: #f0f0f0;
}
</style>
