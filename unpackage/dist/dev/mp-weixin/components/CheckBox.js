"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "CheckBox",
  props: ["category"],
  emits: ["msg"],
  setup(__props, { emit }) {
    const props = __props;
    const text = "请选择" + (props.category.title || "") + "类别";
    const radioChange = (e) => {
      console.log(e);
      emit("msg", e.detail.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: text,
          ["title-font-size"]: "16px",
          type: "square"
        }),
        b: common_vendor.f(props.category.types, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: item
          };
        }),
        c: common_vendor.o(radioChange)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-765599b5"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/components/CheckBox.vue"]]);
wx.createComponent(Component);
