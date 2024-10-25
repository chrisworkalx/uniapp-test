<template>
  <view>
    <text>生命周期</text>
    <text>{{ num }}</text>
    <hcp-dropdown-menu></hcp-dropdown-menu>
    <hcp-vant-drop-down
      :options="menuOptions"
      @change="handleChange"
    ></hcp-vant-drop-down>
  </view>
</template>

<script>
export default {
  name: "life",
  data() {
    return {
      num: 10,
      menuOptions: ["选项1", "选项2", "选项3"],
    };
  },

  methods: {
    handleChange(selectedItem) {
      console.log("Selected item:", selectedItem);
    },
  },

  //初始化挂载阶段-----------------------------start
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },

  beforeMount() {
    console.log("beforeMount");
  },
  onLoad(options) {
    console.log("onLoad");
  },
  onShow() {
    console.log("onShow");
  },
  mounted() {
    console.log("mounted");
    setTimeout(() => {
      this.num = 20;
    }, 2000);
  },
  onReady() {
    console.log("onReady");
  },
  //初始化挂载阶段-----------------------------over
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },

  //切换到后台
  onHide() {
    console.log("onHide");
  },

  onBackPress({ from }) {
    console.log("onBackPress");
  },

  //卸载-----------------------------start
  onUnload() {
    console.log("onUnload");
  },

  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  //卸载--------------------------------over
};
</script>

<style lang="scss" scoped></style>
