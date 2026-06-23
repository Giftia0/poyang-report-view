"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const config = require("../../config.js");
require("../../http/api/user.js");
require("../../http/index.js");
const _sfc_main = {
  __name: "MyPage",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const { user } = common_vendor.storeToRefs(userStore);
    const defaultAvatar = config.resourceURL + "/avatar/default-avatar.png";
    const avatarUrl = common_vendor.computed(() => {
      return user.value.avatar == "" ? defaultAvatar : config.resourceURL + user.value.avatar;
    });
    const username = common_vendor.computed(() => {
      return user.value.username != "" ? user.value.username : "登录/注册";
    });
    const goToLogin = () => {
      if (user.value.id != "")
        return;
      common_vendor.index.navigateTo({
        url: "/pages/LoginPage/LoginPage"
      });
    };
    const goToAuth = () => {
      if (user.value.isAuth == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/AuthPage/AuthPage"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/AuthInfo/AuthInfo"
        });
      }
    };
    const exit = () => {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确认要退出当前账号吗？",
        confirmColor: "red",
        success: function(res) {
          if (res.confirm) {
            console.log("点击了确认");
            userStore.exitLogin();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o(($event) => goToLogin()),
        c: common_vendor.t(common_vendor.unref(username)),
        d: common_vendor.o(($event) => goToLogin()),
        e: common_vendor.unref(user).isAuth == 1
      }, common_vendor.unref(user).isAuth == 1 ? {} : {}, {
        f: common_vendor.o(($event) => goToAuth()),
        g: common_vendor.o(($event) => _ctx.goToSetting()),
        h: common_vendor.o(($event) => exit())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bfed0b8"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/MyPage/MyPage.vue"]]);
wx.createPage(MiniProgramPage);
