<template>
	<view class="box">
		<StatusList>
			<StatusListItem v-for="(item,idx) in statusList" :key="item.id" :pre="indexToStatus(idx-1)"
				:status="item.status" :next="indexToStatus(idx+1)" :detail="item.action" :operator="item.operator"
				:time="moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')" :imgList="item.imgList">
			</StatusListItem>
			<StatusListItem v-if="haveAction" :pre="latestStatus.status" status="action" :reloadData="loadData"
				:isReporter="user.id == reporterId">
			</StatusListItem>
		</StatusList>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { computed, ref } from 'vue'
	import StatusList from '../../components/StatusList.vue'
	import StatusListItem from '../../components/StatusListItem.vue'
	import { getReportStatusList } from '../../http/api/report.js'
	import { useUserStore } from '../../store/user.js'

	import moment from 'moment';

	const user = useUserStore().user;
	const reportId = ref('');
	const reporterId = ref('');

	const loadData = () => {
		getReportStatusList(reportId.value).then(res => {
			console.log(res.data.data)
			statusList.value = res.data.data;
			latestStatus.value = statusList.value[statusList.value.length - 1];
		})
	}

	onLoad((opt) => {
		reportId.value = opt.reportId;
		reporterId.value = opt.reporterId;
		console.log(reporterId.value)
		loadData();
	})

	const statusList = ref([]);
	const latestStatus = ref({});
	const tempStatus = ref({
		status: ''
	});

	const haveAction = computed(() => {
		return latestStatus.value.status != 'end' &&
			latestStatus.value.status != 'evaluate' &&
			latestStatus.value.status != 'dangerous' &&
			user.role == 'admin';
	})
	const indexToStatus = (index) => {
		if (index == statusList.value.length && haveAction.value) return 'action';
		if (index < 0) return null;
		if (statusList.value[index] != null) return statusList.value[index].status;
	}
</script>

<style scoped lang="scss">
	$color1: $uni-color-error; // 红色  
	$color2: $uni-color-warning; // 绿色  

	$mixed-color: mix($color1, $color2, 50%); // 混合红色和绿色，权重各占50%  

	::v-deep .icon-del-box,
	.icon-del {
		transform: scale(0.8) rotate(45deg);
		top: 0;
		right: 0;
	}

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
			margin: 10rpx 0;

			.action-staff {
				margin-left: auto;
			}

			.action-detail {
				margin-left: 10rpx;
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
</style>