<template>
	<view class="box">
		<CheckBox :category="categories[report.category]" @msg="getMsg"></CheckBox>
		<view class="content">
			<uni-section class="title" title="标题" title-font-size="16px" type="square">
				<template v-slot:right>
					<input v-model="report.title" style="width: 530rpx;" placeholder="请输入标题" maxlength="15" />
				</template>
			</uni-section>
			<uni-section class="title" title="详细描述" title-font-size="16px" type="square">
				<view style="padding: 0 20rpx;">
					<textarea v-model="report.detail" placeholder="请输入您的详细描述" maxlength="200" auto-height
						style="width: 100%;min-height: 300rpx;"></textarea>
				</view>
			</uni-section>
		</view>
		<view class="place" v-if="report.category != 2">
			<uni-section class="title" title="地点" title-font-size="16px" type="square">
				<template v-slot:right>
					<view class="right" @click="toPick()">
						<view class="tip-map">点击进行选点</view>
						<image class="icon" src="../../static/icon/pages/clue/report/map-picker.png"></image>
					</view>
				</template>
				<uni-list>
					<uni-list-item title="经度" :rightText="report.lng" />
					<uni-list-item title="纬度" :rightText="report.lat" />
					<uni-list-item title="地址" :note="report.address" />
					<uni-list-item title="是否禁渔" rightText="是" />
				</uni-list>
			</uni-section>
		</view>
		<view class="img-picker">
			<uni-section class="title" title="图片材料" title-font-size="16px" type="square">
			</uni-section>
			<view class="img-picker-inner">
				<uni-file-picker limit="9" title="最多选择9张图片" @select="selected" @delete="deleted"></uni-file-picker>
			</view>
		</view>
		<view class="confirm">
			<view class="confirm-text" @click="submit()">提交</view>
		</view>
	</view>
</template>

<script setup>
	import CheckBox from '../../components/CheckBox.vue'
	import ReportContent from '../../components/ReportContent.vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { addReport, addReportImg } from '../../http/api/report.js'

	onLoad((opt) => {
		report.value.category = parseInt(opt.category);
	})

	onShow(() => {
		uni.$on("handleBack", res => {
			report.value.address = res.address;
			report.value.lng = res.lnglat[0];
			report.value.lat = res.lnglat[1];
			report.value.poi = res.poi;
			report.value.city = res.city;
			report.value.district = res.district;
			report.value.township = res.township;
			// 清除监听
			uni.$off('handleBack');
		})
	})

	const report = ref({
		title: '',
		detail: '',
		lng: '',
		lat: '',
		address: '',
		poi: '',
		isForbid: 0,
		category: 0,
		type: '',
		img: [],
		township:'',
		district:'',
		city:''
	})

	const categories = [{
			title: '举报',
			types: ['非法垂钓', '非法捕捞', '电鱼炸鱼', '水域异常', '其他']
		},
		{
			title: '咨询',
			types: ['禁渔相关', '管理条例', '其他']
		},
		{
			title: '反馈',
			types: ['bug反馈', '功能相关', '工作建议', '其他']
		},
	]



	const toPick = () => {
		uni.navigateTo({
			url: '/pages/PickPoint/PickPoint'
		})
	}

	const getMsg = (type) => {
		report.value.type = type;
	}

	const selected = (res) => {
		for (let i = 0; i < res.tempFilePaths.length; i++) {
			report.value.img.push(res.tempFilePaths[i]);
			console.log(report.value.img)
		}
	}

	const deleted = (res) => {
		report.value.img.splice(res.index, 1);
		console.log(report.value.img)
	}

	const submit = () => {
		addReport(report.value).then(res => {
			const reportId = res.data.data;
			console.log(report.value.img)
			for (let index = 0; index < report.value.img.length; index++) {
				addReportImg(report.value.img[index], index, reportId);
			}
		})
	}
</script>

<style scoped lang="scss">
	.img-picker {
		background-color: white;
		margin: 10rpx;
		padding-bottom: 30rpx;
	}

	.img-picker-inner {
		margin: 0 30rpx;
	}

	.box,
	.content,
	.place {
		padding: 10rpx;
		overflow: hidden;
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
		margin: 0 20rpx;
	}

	.right {
		display: flex;
		align-items: center;

		.tip-map {
			margin-top: 10rpx;
			color: $uni-text-color-placeholder;
		}
	}

	.confirm {
		margin: 0 30rpx;
		height: 100rpx;
		border-radius: $uni-border-radius-base;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		background-color: #2b3e6a;

		.confirm-text {
			font-size: 32rpx;
			color: white;
		}
	}

	
</style>