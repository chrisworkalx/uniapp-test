<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  onPageNotFound() {
    uni.navigateTo({
      url: "/pages/404/404",
    });
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@dcloudio/uni-ui/lib/uni-scss/index.scss";
</style>
