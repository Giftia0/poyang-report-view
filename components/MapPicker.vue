<script setup>
	import { onMounted, onUnmounted, ref } from "vue";
	import AMapLoader from "@amap/amap-jsapi-loader";

	let map = null;
	var longitude = 116.20156,
		latitude = 29.02178;
	onMounted(() => {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				longitude = res.longitude;
				latitude = res.latitude;
			}
		});
		AMapLoader.load({
				key: "7d9b62d65785d5adcb416eedb5ac8f72", // 申请好的Web端开发者Key，首次调用 load 时必填
				version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				plugins: ['AMap.DistrictSearch', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				AMapUI: {
					version: '1.1',
					plugins: ['misc/PositionPicker']
				}
			})
			.then((AMap) => {
				//加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
				AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
					var map = new AMap.Map('container', {
						zoom: 12,
						center: [longitude, latitude],
					})
					var positionPicker = new PositionPicker({
						mode: 'dragMap',
						map: map
					});
					positionPicker.start();
					positionPicker.on('success', function(positionResult) {
						console.log(positionResult)
						lat.value = '' + positionResult.position.lat;
						lng.value = '' + positionResult.position.lng;
						address.value = positionResult.address;
						poi.value = positionResult.nearestPOI;
						city.value = positionResult.regeocode.addressComponent.city;
						district.value = positionResult.regeocode.addressComponent.district;
						township.value = positionResult.regeocode.addressComponent.township;
					});
					var onModeChange = function(e) {
						console.log(e)
						positionPicker.setMode(e.target.value)
					}
					map.addControl(new AMap.ToolBar({
						liteStyle: true
					}))
				});
				
			})
			.catch((e) => {
				console.log(e);
			});
	});

	onUnmounted(() => {
		map?.destroy();
	});

	const lng = ref('')
	const lat = ref('')
	const address = ref('')
	const poi = ref('')
	const city = ref('')
	const district = ref('')
	const township = ref('')

	const submit = () => {
		let obj = new Object();
		obj['lnglat'] = [lng.value, lat.value];
		obj['city'] = city.value;
		obj['district'] = district.value;
		obj['township'] = township.value;
		obj['address'] = address.value;
		obj['poi'] = poi.value;
		uni.navigateBack();
		uni.$emit("handleBack", obj);
	}
</script>

<template>
	<view class="box">
		<div id="container"></div>
		<view class="position">
			<uni-section title="选址地点" type="line">
				<uni-list>
					<uni-list-item title="经度" :rightText="lng" />
					<uni-list-item title="纬度" :rightText="lat" />
					<uni-list-item title="地址" :note="address" />
					<uni-list-item title="辅助信息" :note="poi" />
				</uni-list>
			</uni-section>
		</view>
		<view class="confirm">
			<view class="confirm-text" @click="submit()">确定</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.box {
		height: 93vh;
		display: flex;
		flex-direction: column;
	}

	.confirm {
		margin: 0 30rpx;
		height: 100rpx;
		border-radius: $uni-border-radius-base;
		background-color: #2b3e6a;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;

		.confirm-text {
			font-size: 32rpx;
			color: white;
		}
	}

	.position {
		width: 750rpx;
	}

	#container {
		width: 750rpx;
		height: 800rpx;
	}
</style>