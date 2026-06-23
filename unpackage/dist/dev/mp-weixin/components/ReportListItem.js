"use strict";
const common_vendor = require("../common/vendor.js");
const utils_dataFormatter = require("../utils/dataFormatter.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  _easycom_uni_list_item2();
}
const _easycom_uni_list_item = () => "../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
if (!Math) {
  _easycom_uni_list_item();
}
const _sfc_main = {
  __name: "ReportListItem",
  setup(__props) {
    const report = common_vendor.ref({
      title: "标题标题标题标题标题标题标",
      detail: "详情详情详情详情详情详情详情详情详情详情详情详情详情详情",
      lng: "116.327214",
      lat: "28.851754",
      type: "电鱼炸鱼",
      township: "瑞洪镇",
      status: "待解决",
      time: "2024-04-12 13:58:58"
    });
    const labelColor = common_vendor.computed(() => {
      if (props.status == "已解决")
        return "#4cd964";
      if (props.status == "跟进中")
        return "#f0ad4e";
      if (props.status == "待解决")
        return "#dd524d";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(report.value.status),
        b: common_vendor.unref(labelColor),
        c: common_vendor.t(_ctx.props.title),
        d: common_vendor.t(_ctx.props.detail),
        e: "https://restapi.amap.com/v3/staticmap?location=" + _ctx.props.lng + "," + _ctx.props.lat + "&zoom=8&size=100*200&markers=mid,,O:" + _ctx.props.lng + "," + _ctx.props.lat + "&key=ae60883bdbc1a4683743d39e168a912c",
        f: common_vendor.t(common_vendor.unref(utils_dataFormatter.formatDate)(_ctx.props.time)),
        g: common_vendor.t(_ctx.props.type),
        h: common_vendor.t(_ctx.props.township),
        i: common_vendor.p({
          direction: "column"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-608564ff"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/components/ReportListItem.vue"]]);
wx.createComponent(Component);
