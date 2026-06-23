"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_report = require("../../http/api/report.js");
require("../../http/index.js");
if (!Math) {
  ReportListItem();
}
const ReportListItem = () => "../../components/ReportListItem.js";
const _sfc_main = {
  __name: "MyReport",
  setup(__props) {
    const list = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      http_api_report.getMyReport().then((res) => {
        list.value = res.data.data;
        console.log(list.value);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: "47f36dd3-0-" + i0,
            c: common_vendor.p({
              title: item.title,
              detail: item.detail,
              lng: item.lng,
              lat: item.lat,
              type: item.type,
              township: item.township,
              status: item.status,
              time: item.createTime
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/MyReport/MyReport.vue"]]);
wx.createPage(MiniProgramPage);
