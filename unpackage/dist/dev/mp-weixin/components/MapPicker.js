"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_list_item = () => "../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "MapPicker",
  setup(__props) {
    var longitude = 116.20156, latitude = 29.02178;
    common_vendor.onMounted(() => {
      common_vendor.index.getLocation({
        type: "wgs84",
        success: function(res) {
          longitude = res.longitude;
          latitude = res.latitude;
        }
      });
      common_vendor.AMapLoader.load({
        key: "7d9b62d65785d5adcb416eedb5ac8f72",
        // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.DistrictSearch", "AMap.ToolBar"],
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          version: "1.1",
          plugins: ["misc/PositionPicker"]
        }
      }).then((AMap) => {
        AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
          var map = new AMap.Map("container", {
            zoom: 12,
            center: [longitude, latitude]
          });
          var positionPicker = new PositionPicker({
            mode: "dragMap",
            map
          });
          positionPicker.start();
          positionPicker.on("success", function(positionResult) {
            console.log(positionResult);
            lat.value = "" + positionResult.position.lat;
            lng.value = "" + positionResult.position.lng;
            address.value = positionResult.address;
            poi.value = positionResult.nearestPOI;
            city.value = positionResult.regeocode.addressComponent.city;
            district.value = positionResult.regeocode.addressComponent.district;
            township.value = positionResult.regeocode.addressComponent.township;
          });
          map.addControl(new AMap.ToolBar({
            liteStyle: true
          }));
        });
      }).catch((e) => {
        console.log(e);
      });
    });
    common_vendor.onUnmounted(() => {
    });
    const lng = common_vendor.ref("");
    const lat = common_vendor.ref("");
    const address = common_vendor.ref("");
    const poi = common_vendor.ref("");
    const city = common_vendor.ref("");
    const district = common_vendor.ref("");
    const township = common_vendor.ref("");
    const submit = () => {
      let obj = new Object();
      obj["lnglat"] = [lng.value, lat.value];
      obj["city"] = city.value;
      obj["district"] = district.value;
      obj["township"] = township.value;
      obj["address"] = address.value;
      obj["poi"] = poi.value;
      common_vendor.index.navigateBack();
      common_vendor.index.$emit("handleBack", obj);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "经度",
          rightText: lng.value
        }),
        b: common_vendor.p({
          title: "纬度",
          rightText: lat.value
        }),
        c: common_vendor.p({
          title: "地址",
          note: address.value
        }),
        d: common_vendor.p({
          title: "辅助信息",
          note: poi.value
        }),
        e: common_vendor.p({
          title: "选址地点",
          type: "line"
        }),
        f: common_vendor.o(($event) => submit())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8071cba7"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/components/MapPicker.vue"]]);
wx.createComponent(Component);
