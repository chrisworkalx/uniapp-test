<template>
  <view class="drop-down-menu">
    <!-- 菜单按钮，点击后弹出菜单 -->
    <view @click="openPopup($event)" class="menu-item" ref="menuButton">
      菜单
      <text>▼</text>
    </view>

    <!-- 下拉弹出层 -->
    <!-- <uni-popup ref="popup" style="margin-top: 200px" type="top">
      <view class="popup-content">
        <view class="submenu-item">子菜单1</view>
        <view class="submenu-item">子菜单2</view>
        <view class="submenu-item">子菜单3</view>
      </view>
    </uni-popup> -->
    <view
      class="pop-up-container"
      :style="{ top: btnHeight + 'px' }"
      v-if="isShow"
    >
      <view class="popup-content">
        <view class="submenu-item">子菜单1</view>
        <view class="submenu-item">子菜单2</view>
        <view class="submenu-item">子菜单3</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "hcp-dropdown-menu",
  data() {
    return {
      popupStyle: "", // 动态设置 popup 的样式
      screenTop: 0,
      popTop: 0,
      isShow: false,
      btnHeight: 0,
    };
  },
  methods: {
    openPopup(event) {
      this.isShow = true;
      uni.getSystemInfo({
        success: (result) => {
          //   console.log("result", result);
          this.screenTop = result.screenTop;
        },
        fail: (error) => {},
      });
      // 获取当前按钮的位置信息
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".menu-item")
        .boundingClientRect((data) => {
          console.log("data", data);
          // 获取按钮的底部位置
          const { bottom, left, width, height, top } = data;
          const popTop = height + top + this.screenTop;
          console.log("popTop", popTop);
          this.popTop = popTop;

          this.btnHeight = height;
          // 设置弹出层的位置
          this.popupStyle = `position: absolute; top: ${popTop}px; left: ${left}px; width: ${width}px;`;

          // 打开弹出层
          //   this.$refs.popup.open();
        })
        .exec();
    },
  },
};
</script>

<style scoped>
.drop-down-menu {
  position: relative;
}
.menu-item {
  padding: 15px;
  background-color: #f5f5f5;
  text-align: center;
  border: 1px solid #ddd;
}

.pop-up-container {
  position: absolute;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup-content {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
}

.submenu-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
