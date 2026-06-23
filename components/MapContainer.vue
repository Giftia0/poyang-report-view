<script setup>
	import { onMounted, onUnmounted } from "vue";
	import AMapLoader from "@amap/amap-jsapi-loader";
	import { points } from '../data/community.js'
	import { district } from '../data/district.js'

	let map = null;

	onMounted(() => {
		AMapLoader.load({
				key: "7d9b62d65785d5adcb416eedb5ac8f72", // 申请好的Web端开发者Key，首次调用 load 时必填
				version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				plugins: ['AMap.DistrictSearch', 'AMap.IndexCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
			})
			.then((AMap) => {
				const mask = []
				var districtSearch = new AMap.DistrictSearch({
					// 关键字对应的行政区级别，country表示国家
					level: "city",
					//  显示下级行政区级数，1表示返回下一级行政区
					subdistrict: 1,
					extensions: 'all'
				})
				// 搜索所有省/直辖市信息
				districtSearch.search('南昌市', function(status, result) {
					// 查询成功时，result即为对应的行政区信息
					const bounds1 = result.districtList[0].boundaries
					for (let i = 0; i < bounds1.length; i++) {
						mask.push([bounds1[i]])
					}
					districtSearch.search('上饶市', function(status, result) {
						// 查询成功时，result即为对应的行政区信息
						const bounds2 = result.districtList[0].boundaries
						for (let i = 0; i < bounds2.length; i++) {
							mask.push([bounds2[i]])
						}
						districtSearch.search('九江市', function(status, result) {
							// 查询成功时，result即为对应的行政区信息
							const bounds3 = result.districtList[0].boundaries
							for (let i = 0; i < bounds3.length; i++) {
								mask.push([bounds3[i]])
							}
							var adCode = 360000;
							var depth = 1;
							var map = new AMap.Map("container", {
								zoom: 7,
								zooms: [7, 22],
								center: [116.20156, 29.02178],
								pitch: 0,
								viewMode: '3D',
								features: ['bg', 'point', 'road', 'building'],
								mask: mask,
								rotateEnable: false,
								mapStyle: "amap://styles/89af1c78cfce3642e33d2c10295be5e7"
							});
							var bounds = map.getBounds();
							map.setLimitBounds(bounds);

							// 创建省份图层
							var disProvince;

							function initPro(code, dep) {
								dep = typeof dep == 'undefined' ? 2 : dep;
								adCode = code;
								depth = dep;

								disProvince && disProvince.setMap(null);

								disProvince = new AMap.DistrictLayer.Province({
									zIndex: 12,
									adcode: [code],
									depth: dep,
									styles: {
										'fill': '',
										'province-stroke': 'cornflowerblue',
										'city-stroke': 'cornflowerblue', // 中国地级市边界
										'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
									}
								});
								map.add(disProvince)
							}

							initPro(adCode, depth);
							for (var i = 0; i < bounds1.length; i += 1) {
								new AMap.Polyline({
									path: bounds1[i],
									strokeColor: '#de585a',
									strokeWeight: 2,
									map: map
								})
							}
							for (var i = 0; i < bounds2.length; i += 1) {
								new AMap.Polyline({
									path: bounds2[i],
									strokeColor: '#de585a',
									strokeWeight: 2,
									map: map
								})
							}
							for (var i = 0; i < bounds3.length; i += 1) {
								new AMap.Polyline({
									path: bounds3[i],
									strokeColor: '#de585a',
									strokeWeight: 2,
									map: map
								})
							}

							var count = points.length;

							function clusterMarkers() {
								var markerList = [];
								var marker = new AMap.Marker({
									map: map,
								})
								markerList.push(marker);
								return markerList;
							}
							var clusterIndexSet = {
								city: {
									minZoom: 2,
									maxZoom: 9,
								},
								district: {
									minZoom: 9,
									maxZoom: 12,
								},
								township: {
									minZoom: 12,
									maxZoom: 22,
								},
							};

							function getStyle(context) {
								var clusterData = context.clusterData; // 聚合中包含数据
								var index = context.index; // 聚合的条件
								var count = context.count; // 聚合中点的总数
								var marker = context.marker; // 聚合绘制点 Marker 对象
								var color = [
									'8,60,156',
									'66,130,198',
									'78,200,211', //各级颜色
								];
								var indexs = ['city', 'district', 'township'];
								var i = indexs.indexOf(index['mainKey']);
								var text = clusterData[0][index['mainKey']];
								var size = Math.round(30 + Math.pow(count / points
									.length, 1 / 5) * 70);
								if (i <= 1) {
									var extra = '<span class="showCount">' + context
										.count + '</span>';
									text = '<span class="showName">' + text +
										'</span>';
									text += extra;
								} else {
									size = 12 * text.length + 20;
								}
								var style = {
									bgColor: 'rgba(' + color[i] + ',.8)',
									borderColor: 'rgba(' + color[i] + ',1)',
									text: text,
									size: size,
									index: i,
									color: '#ffffff',
									textAlign: 'center',
									boxShadow: '0px 0px 5px rgba(0,0,0,0.8)'
								}
								return style;
							}

							function getPosition(context) {
								var key = context.index.mainKey;
								var dataItem = context.clusterData && context
									.clusterData[0];
								var districtName = dataItem[key];
								if (!district[districtName]) {
									return null;
								}
								var center = district[districtName].center.split(',');
								var centerLnglat = new AMap.LngLat(center[0], center[
									1]);
								return centerLnglat;
							}

							function _customRender(data) {
								const keys = Object.keys(data.clusterData);
								let markers = [];
								for (var i = 0; i < keys.length; i++) {
									var key = keys[i];
									var cluster = data.clusterData[key];
									var position = cluster.data[0].lnglat;
									var marker = new AMap.LabelMarker({
										position: position,
										text: {
											content: cluster.data.length
												.toString(),
											style: {
												fillColor: '#ffffff'
											}
										}
									});
									markers.push(marker)
								}
								return {
									type: 'type',
									layer: null,
									markers: markers,
								};
							}
							// 自定义聚合点样式
							function _renderClusterMarker(context) {
								var clusterData = context.clusterData; // 聚合中包含数据
								var index = context.index; // 聚合的条件
								var count = context.count; // 聚合中点的总数
								var marker = context.marker; // 聚合点标记对象
								var styleObj = getStyle(context);
								// 自定义点标记样式
								var div = document.createElement('div');
								div.className = 'amap-cluster';
								div.style.display = 'flex';
								div.style.justifyContent = 'center';
								div.style.flexDirection = 'column';
								div.style.alignItems = 'center';
								div.style.backgroundColor = styleObj.bgColor;
								div.style.width = styleObj.size + 'px';
								if (styleObj.index <= 1) {
									div.style.height = styleObj.size + 'px';
									// 自定义点击事件
									context.marker.on('click', function(e) {
										console.log(e)
										var curZoom = map.getZoom();
										if (curZoom < 20) {
											curZoom += 1;
										}
										map.setZoomAndCenter(curZoom, e
											.lnglat);
									});
								}
								div.style.border = 'solid 1px ' + styleObj.borderColor;
								div.style.borderRadius = styleObj.size + 'px';
								div.innerHTML = styleObj.text;
								div.style.color = styleObj.color;
								div.style.textAlign = styleObj.textAlign;
								div.style.boxShadow = styleObj.boxShadow;
								context.marker.setContent(div)
								// 自定义聚合点标记显示位置
								var position = getPosition(context);
								if (position) {
									context.marker.setPosition(position);
								}
								context.marker.setAnchor('center');

							};

							var cluster = new AMap.IndexCluster(map, points, {
								renderClusterMarker: _renderClusterMarker,
								clusterIndexSet: clusterIndexSet,
							});
						})
					})
				})
			})
			.catch((e) => {
				console.log(e);
			});
	});

	onUnmounted(() => {
		map?.destroy();
	});
</script>

<template>
	<div id="container"></div>
</template>

<style scoped>
	#container {
		width: 100%;
		height: 500rpx;
		background: white !important;
	}

	.amap-cluster {
		display: flex; 
		justify-content: center;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
	}

	.showName {
		font-size: 14px;
	}

	.showCount,
	.showName {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 80%;
	}
</style>