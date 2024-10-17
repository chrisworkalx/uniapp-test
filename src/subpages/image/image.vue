<template>
  <view class="page">
    <button @click="chooseImage" type="primary">上传展示图片</button>
    <image
      v-if="imageSrc"
      :src="imageSrc"
      mode="aspectFit"
      style="width: 200px; height: 200px; background-color: #eeeeee"
    ></image>
    <view class="image-list">
      <view class="image-item" v-for="(item, index) in array" :key="index">
        <view class="image-content">
          <image
            style="width: 200px; height: 200px; background-color: #eeeeee"
            :mode="item.mode"
            :src="src"
            @error="imageError"
            @longtap="handleImage"
          ></image>
        </view>
        <view class="image-title">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "image",
  data() {
    return {
      array: [
        {
          mode: "scaleToFill",
          text: "scaleToFill：不保持纵横比缩放图片，使图片完全适应",
        },
        {
          mode: "aspectFit",
          text: "aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来",
        },
        {
          mode: "aspectFill",
          text: "aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来",
        },
        {
          mode: "top",
          text: "top：不缩放图片，只显示图片的顶部区域",
        },
        {
          mode: "bottom",
          text: "bottom：不缩放图片，只显示图片的底部区域",
        },
        {
          mode: "center",
          text: "center：不缩放图片，只显示图片的中间区域",
        },
        {
          mode: "left",
          text: "left：不缩放图片，只显示图片的左边区域",
        },
        {
          mode: "right",
          text: "right：不缩放图片，只显示图片的右边边区域",
        },
        {
          mode: "top left",
          text: "top left：不缩放图片，只显示图片的左上边区域",
        },
        {
          mode: "top right",
          text: "top right：不缩放图片，只显示图片的右上边区域",
        },
        {
          mode: "bottom left",
          text: "bottom left：不缩放图片，只显示图片的左下边区域",
        },
        {
          mode: "bottom right",
          text: "bottom right：不缩放图片，只显示图片的右下边区域",
        },
      ],
      src: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
      imageSrc: "",
    };
  },
  methods: {
    imageError: function (e) {
      console.error("image发生error事件，携带值为" + e.detail.errMsg);
    },
    handleImage() {
      // 检查并请求权限
      uni.getSetting({
        success: (res) => {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            uni.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                uni.showToast({
                  title: "授权成功",
                  icon: "success",
                  mask: true,
                });
                this.downloadAndSaveImage(this.src);
              },
              fail: () => {
                uni.showModal({
                  title: "授权失败",
                  content: "请授权保存到相册权限",
                  showCancel: false,
                });
              },
            });
          } else {
            uni.showToast({
              title: "已经授权成功",
              icon: "success",
              mask: true,
            });
            this.downloadAndSaveImage(this.src);
          }
        },
      });
    },

    downloadAndSaveImage(imageUrl) {
      //需要真机测试进行连接下载保存图片等
      uni.downloadFile({
        url: imageUrl,
        success: (res) => {
          uni.showToast({
            title: "下载缓存成功",
            icon: "success",
          });
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({
                  title: "保存成功",
                  icon: "success",
                });
              },
              fail: (err) => {
                console.error("保存失败：", err);
                uni.showToast({
                  title: "保存失败",
                  icon: "error",
                });
              },
            });
          }
        },
        fail: (err) => {
          console.error("下载失败：", err);
          uni.showToast({
            title: "下载缓存失败",
            icon: "error",
          });
        },
      });
    },
    chooseImage() {
      uni.chooseImage({
        count: 1, //默认选择一张或者拍一张
        sizeType: ["original", "compressed"], //图片处理方式
        sourceType: ["album", "camera"], //相册或者拍照
        success: (res) => {
          this.imageSrc = res.tempFilePaths[0];
          uni.showToast({
            title: "选择成功",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
