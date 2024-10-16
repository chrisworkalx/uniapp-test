<template>
  <div>找不到页面</div>
</template>

<script>
export default {
  onLoad(options) {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      uni.switchTab({ url: "/pages/index/index" });
    }, 2000);
  },
};
</script>

<style scoped></style>
