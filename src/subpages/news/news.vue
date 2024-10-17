<template>
  <div>
    <text>分包新闻页</text>
  </div>
</template>

<script>
export default {
  onLoad(options) {
    console.log("分包新闻页加载");
    console.log("options", options);
    uni.showToast({
      title: JSON.stringify(options),
      icon: "none",
      mask: true,
    });
  },
  onUnload() {
    console.log("分包新闻页卸载");
  },
};
</script>

<style scoped></style>
