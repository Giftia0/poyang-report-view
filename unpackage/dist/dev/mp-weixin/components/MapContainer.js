"use strict";
const common_vendor = require("../common/vendor.js");
const data_community = require("../data/community.js");
const data_district = require("../data/district.js");
const _sfc_main = {
  __name: "MapContainer",
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.AMapLoader.load({
        key: "7d9b62d65785d5adcb416eedb5ac8f72",
        // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.DistrictSearch", "AMap.IndexCluster"]
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const mask = [];
        var districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: "city",
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 1,
          extensions: "all"
        });
        districtSearch.search("南昌市", function(status, result) {
          const bounds1 = result.districtList[0].boundaries;
          for (let i = 0; i < bounds1.length; i++) {
            mask.push([bounds1[i]]);
          }
          districtSearch.search("上饶市", function(status2, result2) {
            const bounds2 = result2.districtList[0].boundaries;
            for (let i = 0; i < bounds2.length; i++) {
              mask.push([bounds2[i]]);
            }
            districtSearch.search("九江市", function(status3, result3) {
              const bounds3 = result3.districtList[0].boundaries;
              for (let i2 = 0; i2 < bounds3.length; i2++) {
                mask.push([bounds3[i2]]);
              }
              var adCode = 36e4;
              var depth = 1;
              var map = new AMap.Map("container", {
                zoom: 7,
                zooms: [7, 22],
                center: [116.20156, 29.02178],
                pitch: 0,
                viewMode: "3D",
                features: ["bg", "point", "road", "building"],
                mask,
                mapStyle: "amap://styles/89af1c78cfce3642e33d2c10295be5e7"
              });
              var bounds = map.getBounds();
              map.setLimitBounds(bounds);
              var disProvince;
              function initPro(code, dep) {
                dep = typeof dep == "undefined" ? 2 : dep;
                adCode = code;
                depth = dep;
                disProvince && disProvince.setMap(null);
                disProvince = new AMap.DistrictLayer.Province({
                  zIndex: 12,
                  adcode: [code],
                  depth: dep,
                  styles: {
                    "fill": "",
                    "province-stroke": "cornflowerblue",
                    "city-stroke": "cornflowerblue",
                    // 中国地级市边界
                    "county-stroke": "rgba(255,255,255,0.5)"
                    // 中国区县边界
                  }
                });
                map.add(disProvince);
              }
              initPro(adCode, depth);
              for (var i = 0; i < bounds1.length; i += 1) {
                new AMap.Polyline({
                  path: bounds1[i],
                  strokeColor: "#de585a",
                  strokeWeight: 2,
                  map
                });
              }
              for (var i = 0; i < bounds2.length; i += 1) {
                new AMap.Polyline({
                  path: bounds2[i],
                  strokeColor: "#de585a",
                  strokeWeight: 2,
                  map
                });
              }
              for (var i = 0; i < bounds3.length; i += 1) {
                new AMap.Polyline({
                  path: bounds3[i],
                  strokeColor: "#de585a",
                  strokeWeight: 2,
                  map
                });
              }
              var clusterIndexSet = {
                city: {
                  minZoom: 2,
                  maxZoom: 9
                },
                district: {
                  minZoom: 9,
                  maxZoom: 12
                },
                township: {
                  minZoom: 12,
                  maxZoom: 22
                }
              };
              function getStyle(context) {
                var clusterData = context.clusterData;
                var index = context.index;
                var count = context.count;
                context.marker;
                var color = [
                  "8,60,156",
                  "66,130,198",
                  "78,200,211"
                  //各级颜色
                ];
                var indexs = ["city", "district", "township"];
                var i2 = indexs.indexOf(index["mainKey"]);
                var text = clusterData[0][index["mainKey"]];
                var size = Math.round(30 + Math.pow(count / data_community.points.length, 1 / 5) * 70);
                if (i2 <= 1) {
                  var extra = '<span class="showCount">' + context.count + "</span>";
                  text = '<span class="showName">' + text + "</span>";
                  text += extra;
                } else {
                  size = 12 * text.length + 20;
                }
                var style = {
                  bgColor: "rgba(" + color[i2] + ",.8)",
                  borderColor: "rgba(" + color[i2] + ",1)",
                  text,
                  size,
                  index: i2,
                  color: "#ffffff",
                  textAlign: "center",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.8)"
                };
                return style;
              }
              function getPosition(context) {
                var key = context.index.mainKey;
                var dataItem = context.clusterData && context.clusterData[0];
                var districtName = dataItem[key];
                if (!data_district.district[districtName]) {
                  return null;
                }
                var center = data_district.district[districtName].center.split(",");
                var centerLnglat = new AMap.LngLat(center[0], center[1]);
                return centerLnglat;
              }
              function _renderClusterMarker(context) {
                context.clusterData;
                context.index;
                context.count;
                context.marker;
                var styleObj = getStyle(context);
                var div = document.createElement("div");
                div.className = "amap-cluster";
                div.style.display = "flex";
                div.style.justifyContent = "center";
                div.style.flexDirection = "column";
                div.style.alignItems = "center";
                div.style.backgroundColor = styleObj.bgColor;
                div.style.width = styleObj.size + "px";
                if (styleObj.index <= 1) {
                  div.style.height = styleObj.size + "px";
                  context.marker.on("click", function(e) {
                    console.log(e);
                    var curZoom = map.getZoom();
                    if (curZoom < 20) {
                      curZoom += 1;
                    }
                    map.setZoomAndCenter(curZoom, e.lnglat);
                  });
                }
                div.style.border = "solid 1px " + styleObj.borderColor;
                div.style.borderRadius = styleObj.size + "px";
                div.innerHTML = styleObj.text;
                div.style.color = styleObj.color;
                div.style.textAlign = styleObj.textAlign;
                div.style.boxShadow = styleObj.boxShadow;
                context.marker.setContent(div);
                var position = getPosition(context);
                if (position) {
                  context.marker.setPosition(position);
                }
                context.marker.setAnchor("center");
              }
              new AMap.IndexCluster(map, data_community.points, {
                renderClusterMarker: _renderClusterMarker,
                clusterIndexSet
              });
            });
          });
        });
      }).catch((e) => {
        console.log(e);
      });
    });
    common_vendor.onUnmounted(() => {
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71d9cc88"], ["__file", "C:/Users/asus/Desktop/Graduation Project/project/poyang-report-view/components/MapContainer.vue"]]);
wx.createComponent(Component);
