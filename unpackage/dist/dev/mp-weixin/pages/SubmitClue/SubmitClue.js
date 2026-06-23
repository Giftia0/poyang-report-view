"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_notice_bar2 + _easycom_uni_group2 + _easycom_uni_section2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_group + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "SubmitClue",
  setup(__props) {
    const toReport = (category) => {
      common_vendor.index.navigateTo({
        url: "/pages/ReportPage/ReportPage?category=" + category
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          text: "uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
        }),
        b: common_vendor.o(($event) => toReport(0)),
        c: common_vendor.p({
          mode: "card"
        }),
        d: common_vendor.o(($event) => toReport(0)),
        e: common_vendor.p({
          title: "我要举报",
          type: "line"
        }),
        f: common_vendor.o(($event) => toReport(1)),
        g: common_vendor.p({
          mode: "card"
        }),
        h: common_vendor.o(($event) => toReport(1)),
        i: common_vendor.p({
          title: "我要咨询",
          type: "line"
        }),
        j: common_vendor.o(($event) => toReport(2)),
        k: common_vendor.p({
          mode: "card"
        }),
        l: common_vendor.o(($event) => toReport(2)),
        m: common_vendor.p({
          title: "我要反馈",
          type: "line"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-815fae87"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/SubmitClue/SubmitClue.vue"]]);
wx.createPage(MiniProgramPage);
