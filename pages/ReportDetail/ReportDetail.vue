<script setup>
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getReportDetail, addToDo, removeToDo, getLatestStatus } from "../../http/api/report.js"
	import { resourceURL } from '../../config.js'
	import { statusIconHandler, statusTextHandler } from '../../utils/status.js'
	import { useUserStore } from '../../store/user.js'
	import moment from 'moment';

	const user = useUserStore().user;


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
			console.log(report.value)
			console.log(imgLists.value)
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



	const toStatusRecord = () => {
		uni.navigateTo({
			url: '/pages/StatusRecord/StatusRecord?reportId=' + report.value.id +
				'&reporterId=' + report.value.reporterId
		})
	}

	const addToDoList = () => {
		addToDo(report.value.id).then(res => {
			getLatestStatus(report.value.id).then(r => {
				latestStatus.value = r.data.data;
			})
		})
	}

	const removeToDoList = () => {
		uni.showModal({
			title: '填写移出原因',
			editable: true,
			success(r) {
				removeToDo(report.value.id, r.content).then(res => {
					getLatestStatus(report.value.id).then(r => {
						latestStatus.value = r.data.data;
					})
				})
			}
		});
	}

	const toPlace = () => {
		window.location.href = "androidamap://viewMap?sourceApplication=appname&poiname=" + report.value.poi + "&lat=" + report.value.lat + "&lon=" + report.value.lng + "&dev=0"
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
					<view class="first-row">
						<image class="icon" :src="statusIconHandler(latestStatus.status)"></image>
						<view class="label">{{ statusTextHandler(latestStatus.status) }}</view>
						<view class="action-time">{{ moment(latestStatus.createTime).format('YYYY-MM-DD HH:mm:ss') }}
						</view>
					</view>
					<view class="second-row">
						<view class="action-detail" v-if="latestStatus.status=='evaluate'">
							<uni-rate allow-half readonly :value="latestStatus.action" />
						</view>
						<view class="action-detail" v-else>{{ latestStatus.action }}</view>
						<view class="action-staff">操作人：{{ latestStatus.operator }}</view>
					</view>
				</view>
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" @click="addToDoList" v-if="latestStatus.status=='dangerous'">
						<image class="icon" src="../../static/icon/pages/clue/report/待办.png"></image>
						<text class="card-actions-item-text">加入待办</text>
					</view>
					<view class="card-actions-item" @click="removeToDoList"
						v-if="latestStatus.status=='follow' && latestStatus.operatorId == user.id">
						<image class="icon" src="../../static/icon/pages/clue/report/待办.png"></image>
						<text class="card-actions-item-text">移出待办</text>
					</view>
					<view class="card-actions-item">
						<image class="icon" src="../../static/icon/pages/clue/report/详情.png"></image>
						<text class="card-actions-item-text" @click="toStatusRecord()">详情</text>
					</view>
				</view>
			</uni-card>
		</view>
		<view class="place" @click="toPlace">
			<view class="place-image" :style="placeImgStyle">
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
					<uni-list-item title="举报类型" :rightText="report.type" />
					<uni-list-item title="举报时间" :rightText="moment(report.createTime).format('YYYY-MM-DD HH:mm:ss')" />
					<uni-list-item title="举报人" :rightText="report.reporter" showArrow />
					<uni-list-item title="经纬度" :rightText=" report.lng + ', ' + report.lat" showArrow
						@click="toPlace" />
					<uni-list-item v-if="report.poi.length<=20" title="辅助地址" :rightText="report.poi" showArrow
						@click="toPlace" />
					<uni-list-item v-else title="辅助地址" :note="report.poi" showArrow @click="toPlace" />
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