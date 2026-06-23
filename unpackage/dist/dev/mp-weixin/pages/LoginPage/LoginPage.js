"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_visitor = require("../../http/api/visitor.js");
const store_user = require("../../store/user.js");
require("../../http/index.js");
require("../../http/api/user.js");
const _sfc_main = {
  __name: "LoginPage",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const isDisable = common_vendor.computed(() => {
      if (loginForm.data.phone.length == 11 && loginForm.data.checkCode.length == 6)
        return false;
      return true;
    });
    const loginForm = common_vendor.reactive({
      data: {
        phone: "",
        checkCode: ""
      }
    });
    const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    const getCheckCode = () => {
      if (sendState == "disable")
        return;
      tip.value = "";
      if (!phoneReg.test(loginForm.data.phone)) {
        tip.value = "请输入有效的手机号";
        return;
      }
      isLoading.value = true;
      http_api_visitor.getCode(loginForm.data.phone).then((res) => {
        console.log(res);
        isLoading.value = false;
        common_vendor.index.showToast({
          icon: "success",
          title: "验证码已发送"
        });
        sendState = "disable";
        console.log(sendState);
        let i = 60;
        let time = setInterval(() => {
          sendBtn.value = "已发送(" + i-- + ")";
        }, 1e3);
        setTimeout(() => {
          clearInterval(time);
          sendState = "avaliable";
          sendBtn.value = "获取验证码";
        }, 6e4);
      });
    };
    const userStore = store_user.useUserStore();
    const login = () => {
      if (!phoneReg.test(loginForm.data.phone)) {
        tip.value = "请输入有效的手机号";
        return;
      }
      if (loginForm.data.checkCode.length != 6) {
        tip.value = "无效验证码";
        return;
      }
      isLoading.value = true;
      http_api_visitor.loginByCode(loginForm.data.phone, loginForm.data.checkCode).then((res) => {
        isLoading.value = false;
        common_vendor.index.setStorageSync("token", res.data.data);
        userStore.getUserInfo();
        common_vendor.index.switchTab({
          url: "/pages/MyPage/MyPage"
        });
      });
    };
    const tip = common_vendor.ref("");
    var sendBtn = common_vendor.ref("获取验证码");
    var sendState = "avaliable";
    common_vendor.watch(loginForm.data, (value, old) => {
    });
    return (_ctx, _cache) => {
      return {
        a: loginForm.data.phone,
        b: common_vendor.o(($event) => loginForm.data.phone = $event.detail.value),
        c: loginForm.data.phone != "",
        d: common_vendor.o(($event) => loginForm.data.phone = ""),
        e: common_vendor.t(common_vendor.unref(sendBtn)),
        f: common_vendor.o(($event) => getCheckCode()),
        g: loginForm.data.checkCode,
        h: common_vendor.o(($event) => loginForm.data.checkCode = $event.detail.value),
        i: loginForm.data.checkCode != "",
        j: common_vendor.o(($event) => loginForm.data.checkCode = ""),
        k: common_vendor.t(tip.value),
        l: common_vendor.unref(isDisable) ? 1 : "",
        m: common_vendor.o(($event) => login())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-314e8b73"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/LoginPage/LoginPage.vue"]]);
wx.createPage(MiniProgramPage);
