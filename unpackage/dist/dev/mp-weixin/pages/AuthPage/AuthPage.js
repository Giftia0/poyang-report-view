"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_user = require("../../http/api/user.js");
const config = require("../../config.js");
const http_index = require("../../http/index.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "AuthPage",
  setup(__props) {
    const userStore = store_user.useUserStore();
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      http_api_user.clearAuthRecord().then((res) => {
        common_vendor.index.hideLoading();
      });
    });
    const srcFace = common_vendor.ref("");
    const srcBack = common_vendor.ref("");
    var flagFace = true;
    var flagBack = true;
    const name = common_vendor.ref("");
    const num = common_vendor.ref("");
    const btnStatus = common_vendor.computed(() => {
      return srcFace.value == "" || srcBack.value == "" ? false : true;
    });
    const btnColor = common_vendor.computed(() => {
      return srcFace.value == "" || srcBack.value == "" ? "#c0c0c0" : "#2b3e6a";
    });
    const uploadIdcardImg = (side) => {
      if (side == "face" && flagFace == false)
        return;
      if (side == "back" && flagBack == false)
        return;
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          if (side == "face")
            flagFace = false;
          else
            flagBack = false;
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = common_vendor.index.uploadFile({
            url: http_index.baseURL + "/user/uploadIdcard",
            filePath: tempFilePaths[0],
            name: "multipartFile",
            header: {
              Authorization: common_vendor.index.getStorageSync("token")
            },
            formData: {
              "side": side
            },
            success: (uploadFileRes) => {
              if (side == "face")
                flagFace = true;
              else
                flagBack = true;
              clock1 = setInterval(() => {
                if (side == "face")
                  percent1.value += 1;
                else
                  percent2.value += 1;
              }, 50);
              setTimeout(() => {
                clearInterval(clock1);
              }, 1e3);
              const data = JSON.parse(uploadFileRes.data);
              console.log(data);
              if (data.code != 200) {
                common_vendor.index.showToast({
                  title: data.msg,
                  icon: "error"
                });
                if (side == "face") {
                  percent1.value = 0;
                  srcFace.value = "";
                  name.value = "";
                  num.value = "";
                } else {
                  percent2.value = 0;
                  srcBack.value = "";
                }
                clearInterval(clock1);
                clearInterval(clock2);
                return;
              }
              const record = data.data;
              if (side == "back")
                srcBack.value = config.resourceURL + record.img;
              if (side == "face") {
                srcFace.value = config.resourceURL + record.img;
                const info = JSON.parse(record.info);
                name.value = info.name;
                num.value = info.num;
              }
            }
          });
          uploadTask.onProgressUpdate((res2) => {
            if (side == "face")
              percent1.value = res2.progress * 0.4;
            else
              percent2.value = res2.progress * 0.4;
            if (res2.progress == 100) {
              clock2 = setInterval(() => {
                if (side == "face")
                  percent1.value += 0.25;
                else
                  percent2.value += 0.25;
              }, 50);
              setTimeout(() => {
                clearInterval(clock2);
              }, 8e3);
            }
          });
        }
      });
    };
    const percent1 = common_vendor.ref(0);
    const percent2 = common_vendor.ref(0);
    var clock1, clock2;
    const submit = () => {
      if (!btnStatus)
        return;
      http_api_user.checkAuthRecord().then((res) => {
        common_vendor.index.showToast({
          title: res.data.msg,
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/AuthInfo/AuthInfo"
          });
        }, 1500);
        userStore.getUserInfo();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: srcFace.value,
        b: common_vendor.o(($event) => uploadIdcardImg("face")),
        c: percent1.value,
        d: srcBack.value,
        e: common_vendor.o(($event) => uploadIdcardImg("back")),
        f: percent2.value,
        g: common_vendor.t(name.value),
        h: common_vendor.t(num.value),
        i: common_vendor.o(($event) => submit()),
        j: common_vendor.unref(btnColor)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e82ab2f7"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/AuthPage/AuthPage.vue"]]);
wx.createPage(MiniProgramPage);
