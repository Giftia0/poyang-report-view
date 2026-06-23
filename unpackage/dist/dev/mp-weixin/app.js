"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_user = require("./store/user.js");
require("./http/api/user.js");
require("./http/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/MyPage/MyPage.js";
  "./pages/LoginPage/LoginPage.js";
  "./pages/AuthPage/AuthPage.js";
  "./pages/AuthInfo/AuthInfo.js";
  "./pages/PickPoint/PickPoint.js";
  "./pages/SubmitClue/SubmitClue.js";
  "./pages/ReportPage/ReportPage.js";
  "./pages/MyReport/MyReport.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    store_user.useUserStore().getUserInfo();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/App.vue"]]);
const pinia = common_vendor.createPinia();
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
