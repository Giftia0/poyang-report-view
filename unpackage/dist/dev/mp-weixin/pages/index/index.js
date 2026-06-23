"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_user = require("../../http/api/user.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_section + MapContainer)();
}
const MapContainer = () => "../../components/MapContainer.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      http_api_user.getAuthInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "举报线索数据",
          type: "line",
          titleFontSize: "18px",
          subTitle: "近30天"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
