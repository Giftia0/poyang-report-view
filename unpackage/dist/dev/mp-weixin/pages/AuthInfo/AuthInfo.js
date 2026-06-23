"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_user = require("../../http/api/user.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "AuthInfo",
  setup(__props) {
    common_vendor.onLoad(() => {
      http_api_user.getAuthInfo().then((res) => {
        info.value = res.data.data;
      });
    });
    const info = common_vendor.ref({
      name: "",
      sex: "",
      address: "",
      num: "",
      expiredDate: "",
      institution: ""
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "姓名",
          rightText: info.value.name
        }),
        b: common_vendor.p({
          title: "性别",
          rightText: info.value.sex
        }),
        c: common_vendor.p({
          title: "地址",
          rightText: info.value.address
        }),
        d: common_vendor.p({
          title: "个人基本信息",
          type: "line"
        }),
        e: common_vendor.p({
          title: "身份证号",
          rightText: info.value.num
        }),
        f: common_vendor.p({
          title: "有效期至",
          rightText: info.value.expiredDate
        }),
        g: common_vendor.p({
          title: "签发机关",
          rightText: info.value.institution
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1a332b83"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/AuthInfo/AuthInfo.vue"]]);
wx.createPage(MiniProgramPage);
