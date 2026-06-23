<script setup>
	import MapContainer from '../../components/MapContainer.vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { getReportDataView } from '../../http/api/report.js'
	import { getAuthInfo } from '../../http/api/user.js'
	import { ref } from 'vue';

	const total = ref('');
	const historyTotal = ref('');
	const successCnt = ref('');
	const dangerousCnt = ref('');
	const inTimeRatio = ref('');
	const satisfactionRatio = ref('');

	onShow(() => {
		getReportDataView().then(res => {
			const data = res.data.data;
			total.value = data.total;
			historyTotal.value = data.historyTotal;
			successCnt.value = data.successCnt;
			dangerousCnt.value = data.dangerousCnt;
			inTimeRatio.value = data.inTimeRatio;
			satisfactionRatio.value = data.satisfactionRatio;
		})
	})

	const toReportList = (status, time) => {
		uni.navigateTo({
			url: '/pages/ReportData/ReportData?status=' + status + '&time=' + time
		})
	}
	
	const toHistoryData = () =>{
		uni.navigateTo({
			url:'/pages/StatisticsPage/StatisticsPage'
		})
	}
</script>

<template>
	<view class="box">
		<uni-section title="举报线索数据" type="line" titleFontSize="18px" subTitle="近一个月"></uni-section>
		<view class="map">
			<MapContainer></MapContainer>
		</view>
		<view class="card-box">
			<view class="card" @click="toReportList(0,3)">
				<view class="title">
					<image class="icon" src="../../static/icon/pages/index/chart.png"></image>
					<view class="label">总览</view>
				</view>
				<view class="data">{{ total }} 起</view>
			</view>
			<view class="card" @click="toHistoryData()">
				<view class="title">
					<image class="icon" src="../../static/icon/pages/index/history.png"></image>
					<view class="label f-sm">历史统计</view>
				</view>
				<view class="data">{{ historyTotal }} 起</view>
			</view>
			<view class="card" @click="toReportList(3,3)">
				<view class="title">
					<image class="icon" style="width: 10vw; height: 10vw;margin-bottom: 5rpx;"
						src="../../static/icon/pages/index/resolved.png"></image>
					<view class="label" style="margin-left: 50rpx;">已解决</view>
				</view>
				<view class="data">{{ successCnt }} 起</view>
			</view>
			<view class="card" @click="toReportList(1,3)">
				<view class="title">
					<image class="icon" style="width: 11vw; height: 11vw;"
						src="../../static/icon/pages/index/unresolved.png"></image>
					<view class="label" style="margin-left: 45rpx;">未解决</view>
				</view>
				<view class="data">{{ dangerousCnt }} 起</view>
			</view>
			<view class="card">
				<view class="title">
					<image class="icon" style="width: 14vw; height: 14vw;"
						src="../../static/icon/pages/index/24hours.png"></image>
					<view class="label" style="margin-left: 30rpx;">及时率</view>
				</view>
				<view class="data">{{ inTimeRatio }} %</view>
			</view>
			<view class="card">
				<view class="title">
					<image class="icon" src="../../static/icon/pages/index/satisfaction.png"></image>
					<view class="label">满意度</view>
				</view>
				<view class="data">{{ satisfactionRatio }} %</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.box {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.card-box {
		padding: 2%;
		flex: 1;
		height: 0rpx;
		display: flex;
		margin-top: 20rpx;
		background-color: white;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;

		.card {
			width: 40%;
			height: 23%;
			box-shadow: $uni-shadow-base;
			border: 1px solid rgba(0, 0, 0, 0.2);
			border-radius: $uni-border-radius-base;
			padding: 20rpx;
			overflow: hidden;

			.title {
				display: flex;
				align-items: flex-end;
				height: 50%;
				margin: 10rpx;

				.icon {
					width: 12vw;
					height: 12vw;
				}

				.label {
					font-size: $uni-font-size-lg;
					font-weight: 900;
					margin-left: 40rpx;
					margin-bottom: 20rpx;
				}
			}

			.data {
				width: 100%;
				text-align: center;
				margin-top: 20rpx;
				font-weight: 900;
				color: #324694;
			}
		}
	}
</style>