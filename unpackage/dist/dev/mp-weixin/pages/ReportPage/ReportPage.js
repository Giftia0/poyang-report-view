"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_report = require("../../http/api/report.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_file_picker2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (CheckBox + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_file_picker)();
}
const CheckBox = () => "../../components/CheckBox.js";
const _sfc_main = {
  __name: "ReportPage",
  setup(__props) {
    common_vendor.onLoad((opt) => {
      report.value.category = parseInt(opt.category);
    });
    common_vendor.onShow(() => {
      common_vendor.index.$on("handleBack", (res) => {
        report.value.address = res.address;
        report.value.lng = res.lnglat[0];
        report.value.lat = res.lnglat[1];
        report.value.poi = res.poi;
        report.value.city = res.city;
        report.value.district = res.district;
        report.value.township = res.township;
        common_vendor.index.$off("handleBack");
      });
    });
    const report = common_vendor.ref({
      title: "",
      detail: "",
      lng: "",
      lat: "",
      address: "",
      poi: "",
      isForbid: 0,
      category: 0,
      type: "",
      img: [],
      township: "",
      district: "",
      city: ""
    });
    const categories = [
      {
        title: "举报",
        types: ["非法垂钓", "非法捕捞", "电鱼炸鱼", "水域异常", "其他"]
      },
      {
        title: "咨询",
        types: ["禁渔相关", "管理条例", "其他"]
      },
      {
        title: "反馈",
        types: ["bug反馈", "功能相关", "工作建议", "其他"]
      }
    ];
    const toPick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/PickPoint/PickPoint"
      });
    };
    const getMsg = (type) => {
      report.value.type = type;
    };
    const selected = (res) => {
      for (let i = 0; i < res.tempFilePaths.length; i++) {
        report.value.img.push(res.tempFilePaths[i]);
        console.log(report.value.img);
      }
    };
    const deleted = (res) => {
      report.value.img.splice(res.index, 1);
      console.log(report.value.img);
    };
    const submit = () => {
      http_api_report.addReport(report.value).then((res) => {
        const reportId = res.data.data;
        console.log(report.value.img);
        for (let index = 0; index < report.value.img.length; index++) {
          http_api_report.addReportImg(report.value.img[index], index, reportId);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(getMsg),
        b: common_vendor.p({
          category: categories[report.value.category]
        }),
        c: report.value.title,
        d: common_vendor.o(($event) => report.value.title = $event.detail.value),
        e: common_vendor.p({
          title: "标题",
          ["title-font-size"]: "16px",
          type: "square"
        }),
        f: report.value.detail,
        g: common_vendor.o(($event) => report.value.detail = $event.detail.value),
        h: common_vendor.p({
          title: "详细描述",
          ["title-font-size"]: "16px",
          type: "square"
        }),
        i: report.value.category != 2
      }, report.value.category != 2 ? {
        j: common_vendor.o(($event) => toPick()),
        k: common_vendor.p({
          title: "经度",
          rightText: report.value.lng
        }),
        l: common_vendor.p({
          title: "纬度",
          rightText: report.value.lat
        }),
        m: common_vendor.p({
          title: "地址",
          note: report.value.address
        }),
        n: common_vendor.p({
          title: "是否禁渔",
          rightText: "是"
        }),
        o: common_vendor.p({
          title: "地点",
          ["title-font-size"]: "16px",
          type: "square"
        })
      } : {}, {
        p: common_vendor.p({
          title: "图片材料",
          ["title-font-size"]: "16px",
          type: "square"
        }),
        q: common_vendor.o(selected),
        r: common_vendor.o(deleted),
        s: common_vendor.p({
          limit: "9",
          title: "最多选择9张图片"
        }),
        t: common_vendor.o(($event) => submit())
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-949fbd8c"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/pages/ReportPage/ReportPage.vue"]]);
wx.createPage(MiniProgramPage);
