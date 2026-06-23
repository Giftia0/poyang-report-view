<script setup>
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getReportDetail, addToDo, removeToDo, getLatestStatus, replyReport } from "../../http/api/report.js"
	import { resourceURL } from '../../config.js'
	import { statusIconHandler, statusTextHandler } from '../../utils/status.js'
	import { useUserStore } from '../../store/user.js'
	import moment from 'moment';

	const user = useUserStore().user;
	const content = ref('');

	onLoad((opt) => {
		console.log(opt.id)
		getReportDetail(opt.id).then(res => {
			const data = res.data.data;
			console.log(data);
			report.value = data;
			imgLists.value = data.imgList;
			imgLists.value.forEach(item => {
				item.url = resourceURL + item.url
			})
			latestStatus.value = data.latestStatus;
			console.log(latestStatus.value)
		})
	})

	const report = ref({
		id: '',
		title: '',
		detail: '',
		lng: '',
		lat: '',
		address: '',
		poi: '',
		isForbid: 0,
		category: 0,
		type: '',
		township: '',
		district: '',
		city: '',
		createTime: '',
		reporter: '',
		reporterId: ''
	})


	const latestStatus = ref({});
	const statusIcon = computed(() => {
		return statusIconHandler(latestStatus.value.status);
	})
	const statusText = computed(() => {
		return statusTextHandler(latestStatus.value.status);
	})


	const imgLists = ref([]);
	const placeImgStyle = computed(() => {
		return "background-image: linear-gradient(90deg, rgba(255, 255, 255, 1.0),rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.0)), " +
			"url(https://restapi.amap.com/v3/staticmap?location=" + report.value.lng + "," + report.value.lat +
			"&zoom=9&size=750*200&markers=-1,https://poyang-report-1314510469.cos.ap-guangzhou.myqcloud.com/locate.png,0:" +
			report.value.lng + "," + report.value.lat + "&scale=2&key=ae60883bdbc1a4683743d39e168a912c); "
	})

	const submit = () => {
		replyReport(report.value.id, content.value).then(res => {
			getLatestStatus(report.value.id).then(res => {
				latestStatus.value = res.data.data
			})
			uni.showToast({
				icon: 'success',
				title: '已回复'
			})
		})
	}
</script>


<template>
	<view class="box">
		<view class="header">
			<view class="label">{{ report.type }}</view>
			<view class="title">
				{{ report.title }}
			</view>
		</view>
		<view class="content">
			{{ report.detail }}
		</view>
		<view class="img" v-if="imgLists.length>0">
			<uni-section class="title" title="图片材料" title-font-size="16px" type="line"></uni-section>
			<uni-file-picker v-model="imgLists" readonly file-mediatype="image"></uni-file-picker>
		</view>
		<view class="status-action">
			<uni-card is-full>
				<view class="status">
					<view class="first-row" style="margin-bottom: 30rpx;">
						<image class="icon" :src="statusIconHandler(latestStatus.status)"></image>
						<view class="label">{{ statusTextHandler(latestStatus.status) }}</view>
						<view class="action-time">{{ moment(latestStatus.createTime).format('YYYY-MM-DD HH:mm:ss') }}
						</view>
					</view>
					<view class="second-row" v-if="latestStatus.status=='success'">
						<view class="action-detail">回复内容：{{ latestStatus.action }}</view>
						<view class="action-staff">操作人：{{ latestStatus.operator }}</view>
					</view>
				</view>

				<view slot="actions" class="card-actions" v-if="latestStatus.status=='dangerous'">
					<uni-easyinput type="textarea" v-model="content" placeholder="请输入内容"></uni-easyinput>
					<view class="card-actions-item">
						<button type="primary" style="margin-top: 20rpx;width: 630rpx;font-size: 16px;"
							@click="submit">回复</button>
					</view>
				</view>
			</uni-card>
		</view>
		<view class="place">
			<view class="place-image" :style="placeImgStyle" v-if="report.category!=2">
				<view class="address">
					<view class="township">{{ report.township }}</view>
					<view class="addr-detail">{{ report.address }}</view>
				</view>
			</view>
		</view>
		<view class="detail">
			<uni-section title="详细信息" type="line" title-font-size="16px">
				<uni-list>
					<uni-list-item title="工单编号" :rightText="report.id" />
					<uni-list-item title="类型" :rightText="report.type" />
					<uni-list-item title="时间" :rightText="moment(report.createTime).format('YYYY-MM-DD HH:mm:ss')" />
					<uni-list-item title="用户名" :rightText="report.reporter" showArrow />
					<template v-if="report.category!=2">
						<uni-list-item title="经纬度" :rightText=" report.lng + ', ' + report.lat" showArrow />
						<uni-list-item v-if="report.poi.length<=20" title="辅助地址" :rightText="report.poi" showArrow />
						<uni-list-item v-else title="辅助地址" :note="report.poi" showArrow />
					</template>
				</uni-list>
			</uni-section>
		</view>
	</view>
</template>


<style scoped lang="scss">
	.status-action {
		margin-top: 40rpx;

		.status {
			.first-row {
				display: flex;
				align-items: center;

				.label {
					margin-left: 20rpx;
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}

				.action-time {
					margin-left: auto;
				}

				.icon {
					width: 60rpx;
					height: 60rpx;
				}
			}

			.second-row {
				display: flex;
				flex-wrap: wrap;
				margin: 10rpx 0;

				.action-staff {
					margin-left: auto;
				}

				.action-detail {
					margin-left: 10rpx;
				}
			}
		}
	}

	.card-actions {
		display: flex;
		align-items: center;
		padding-top: 10rpx;
		justify-content: space-around;
		flex-direction: column;
		border-top: 1px solid #ececec;

		.card-actions-item {
			display: flex;
			align-items: center;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 5rpx;
			}
		}
	}

	.place {
		border-radius: 10px;
		overflow: hidden;
		margin-top: 40rpx;
		// border: 1px solid $uni-border-color;

		.place-image {
			width: 710rpx;
			height: 300rpx;
			background-size: cover;
			background-repeat: no-repeat;
			display: flex;
			align-items: center;

			.address {
				width: 400rpx;
				margin-left: 30rpx;

				.township {
					font-weight: bold;
					font-size: $uni-font-size-title;
				}

				.addr-detail {
					font-size: $uni-font-size-paragraph;
					color: $uni-color-paragraph;
				}
			}
		}
	}

	.box {
		padding: 20rpx;
		background-color: white;
	}

	.header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.label {
			background-color: rgba(54, 79, 134, 0.8);
			color: white;
			padding: 10rpx;
			border-radius: $uni-border-radius-sm;
			margin-right: 20rpx;
		}

		.title {
			font-weight: bold;
		}
	}

	.content {
		color: $uni-color-paragraph;
		margin-bottom: 20rpx;
	}
</style>