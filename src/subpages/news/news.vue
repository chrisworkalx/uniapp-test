<template>
  <div>
    <text>分包新闻页</text>
  </div>
</template>

<script>
export default {
  onLoad(options) {
    uni.showToast({
      title: JSON.stringify(options || { content: "空" }),
      icon: "none",
      mask: true,
    });
  },
};
</script>

<style scoped></style>
