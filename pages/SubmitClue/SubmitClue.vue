<script setup>
	const toReport = (category) => {
		uni.navigateTo({
			url: '/pages/ReportPage/ReportPage?category=' + category
		})
	}
	
	const toMyReport = (category) => {
		uni.navigateTo({
			url: '/pages/MyReport/MyReport?category=' + category
		})
	}
</script>

<template>
	<view class="box">
		<uni-notice-bar class="notice-bar" show-icon scrollable
			text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
		<view class="header"></view>
		<view class="my">
			<view class="item" @click="toMyReport(0)">
				<image class="icon" src="../../static/icon/pages/clue/report.png"></image>
				<view class="label">我的举报</view>
			</view>
			<view class="item" @click="toMyReport(1)">
				<image class="icon" src="../../static/icon/pages/clue/consult.png"></image>
				<view class="label">我的咨询</view>
			</view>
			<view class="item" @click="toMyReport(2)">
				<image class="icon" src="../../static/icon/pages/clue/feedback.png"></image>
				<view class="label">我的反馈</view>
			</view>
		</view>
		<view class="content">
			<uni-section title="我要举报" type="line" class="section" @click="toReport(0)">
				<template v-slot:right>
					<view class="slot-icon"> ➟➤ </view>
				</template>
				<uni-group mode="card" class="card">
					<view @click="toReport(0)"> 线索举报（ 如非法垂钓、捕捞及水域异常等 ）</view>
				</uni-group>
			</uni-section>
			<uni-section title="我要咨询" type="line" class="section" @click="toReport(1)">
				<template v-slot:right>
					<view class="slot-icon"> ➟➤ </view>
				</template>
				<uni-group mode="card" class="card">
					<view @click="toReport(1)"> 相关信息咨询（ 如禁渔区、禁渔期及管理条例等 ）</view>
				</uni-group>
			</uni-section>
			<uni-section title="我要反馈" type="line" class="section" @click="toReport(2)">
				<template v-slot:right>
					<view class="slot-icon"> ➟➤ </view>
				</template>
				<uni-group mode="card" class="card">
					<view @click="toReport(2)"> 使用反馈及建议（ 如发现bug、工作建议等 ）</view>
				</uni-group>
			</uni-section>
		</view>
	</view>
</template>


<style scoped lang="scss">
	body {
		overflow-y: hidden;
	}

	.box {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 25%;
		width: 750rpx;
		margin: 0;
		background-image: url("../../static/icon/pages/clue/header-img.jpeg");
		background-size: cover;
	}

	.content {
		width: 100%;
		height: 0;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.section {
			height: 32%;

			.slot-icon {
				color: #b6b6b6;
				margin-right: 30rpx;
			}

			.card {
				margin-bottom: 10rpx;
			}
		}
	}

	.notice-bar {
		margin-bottom: 0;
	}

	.my {
		height: 200rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>