<script setup>
	import { computed, ref, nextTick } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { addToDo, addStatus, addStatusImg } from '../http/api/report.js'
	import { useUserStore } from '../store/user.js'
	import { resourceURL } from '../config.js'


	const reportId = ref('')
	onLoad((opt) => {
		console.log(props)
		reportId.value = opt.reportId;
		if (props.imgList != null)
			for (let i = 0; i < props.imgList.length; i++)
				props.imgList[i].url = resourceURL + props.imgList[i].url;

	})


	const props = defineProps(['status', 'pre', 'next', 'detail', 'time', 'operator', 'isReporter', 'imgList',
		'reloadData'
	]);

	const statusList = {
		success: {
			icon: '../../static/icon/pages/clue/report/success.png',
			text: '已解决'
		},
		follow: {
			icon: '../../static/icon/pages/clue/report/follow.png',
			text: '跟进中'
		},
		dangerous: {
			icon: '../../static/icon/pages/clue/report/dangerous.png',
			text: '待解决'
		},
		end: {
			icon: '../../static/icon/pages/clue/report/end.png',
			text: '已终止'
		},
		evaluate: {
			icon: '../../static/icon/pages/clue/report/evaluate.png',
			text: '已评价'
		}
	}

	const isFold = ref(true);
	const btnText = ref('展开');
	const btnIcon = ref('../../static/icon/pages/clue/report/unfold.png');
	const changeFold = () => {
		if (isFold.value) {
			isFold.value = false;
			btnText.value = '收起';
			btnIcon.value = '../../static/icon/pages/clue/report/fold.png';
		} else {
			isFold.value = true;
			btnText.value = '展开';
			btnIcon.value = '../../static/icon/pages/clue/report/unfold.png';
		}
	}

	const statusIcon = computed(() => {
		if (props.status == 'success') return statusList.success.icon;
		if (props.status == 'dangerous') return statusList.dangerous.icon;
		if (props.status == 'follow') return statusList.follow.icon;
		if (props.status == 'end') return statusList.end.icon;
		if (props.status == 'evaluate') return statusList.evaluate.icon;
	})

	const statusText = computed(() => {
		if (props.status == 'success') return statusList.success.text;
		if (props.status == 'dangerous') return statusList.dangerous.text;
		if (props.status == 'follow') return statusList.follow.text;
		if (props.status == 'end') return statusList.end.text;
		if (props.status == 'evaluate') return statusList.evaluate.text;
	})

	const lineFront = computed(() => {
		if (props.status == 'action') return 'line-head action-card';
		if (props.status == 'evaluate') return 'line-head success-to-evaluate-back';
		if (props.pre == 'dangerous' && props.status == 'follow')
			return 'line-head dangerous-to-follow-back';
		if (props.pre == 'follow' && props.status == 'dangerous')
			return 'line-head follow-to-dangerous-back';
		// if (props.pre == 'dangerous' && props.status == 'end')
		// 	return 'line-head dangerous-to-end-back';
		if (props.pre == 'follow' && props.status == 'success')
			return 'line-head follow-to-success-back';
		if (props.pre == 'follow' && props.status == 'end')
			return 'line-head follow-to-end-back';
		if (props.pre == 'follow' && props.status == 'follow')
			return 'line-head follow-to-follow';
	})

	const lineBack = computed(() => {
		if (props.next == 'action') return 'line-tail action-card';
		if (props.next == 'evaluate') return 'line-tail success-to-evaluate-front';
		if (props.status == 'dangerous' && props.next == 'follow')
			return 'line-tail dangerous-to-follow-front';
		if (props.status == 'follow' && props.next == 'dangerous')
			return 'line-tail follow-to-dangerous-front';
		// if (props.status == 'dangerous' && props.next == 'end')
		// 	return 'line-tail dangerous-to-end-front';
		if (props.status == 'follow' && props.next == 'success')
			return 'line-tail follow-to-success-front';
		if (props.status == 'follow' && props.next == 'end')
			return 'line-tail follow-to-end-front';
		if (props.status == 'follow' && props.next == 'follow')
			return 'line-tail follow-to-follow';
	})

	const dotColor = computed(() => {
		if (props.status == 'dangerous') return '8rpx solid #dd524d';
		if (props.status == 'follow') return '8rpx solid #f0ad4e';
		if (props.status == 'success') return '8rpx solid #4cd964';
		if (props.status == 'end') return '8rpx solid gray';
		if (props.status == 'evaluate') return '8rpx solid #007aff';
		return '8rpx solid #e4e7ed';
	})

	const rate = ref(0);
	const submitRate = (e) => {
		addStatus('evaluate', rate.value, reportId.value).then(res => {
			props.reloadData();
		})
	}

	const description = ref('');
	const descImg = ref([]);
	const descImgCopy = ref([]);
	const submitAction = () => {
		console.log(activeIdx.value);
		console.log(description.value);
		console.log(descImg.value)
		let status;
		if (activeIdx.value == 0) status = 'end';
		else if (activeIdx.value == 1) status = 'follow';
		else if (activeIdx.value == 2) status = 'success';
		console.log('status');
		console.log(status);
		addStatus(status, description.value, reportId.value).then(res => {
			const statusId = res.data.data;
			for (let index = 0; index < descImg.value.length; index++) {
				addStatusImg(descImg.value[index], index, statusId);
			}
			props.reloadData();
			cancelAction();
			descImg.value = [];
			descImgCopy.value = [];
			description.value = '';
		})
	}

	const selected = (res) => {
		for (let i = 0; i < res.tempFilePaths.length; i++) {
			descImg.value.push(res.tempFilePaths[i]);
			console.log(descImg.value)
		}
	}

	const deleted = (res) => {
		descImg.value.splice(res.index, 1);
		console.log(descImg.value)
	}


	const activeIdx = ref(-1);
	const isShowReturn = ref(false);
	const defaultOffset = 190;
	const offset = ref([{}, {}, {}]);
	const classArray = ref([
		['operation-item', 'null'],
		['operation-item', 'null'],
		['operation-item', 'null']
	]);

	const doAction = (idx) => {
		if (activeIdx.value != -1) return;
		activeIdx.value = idx;
		isShowReturn.value = true;
		for (let i = 0; i < classArray.value.length; i++) {
			if (i <= idx) {
				offset.value[i] = { '--offset': defaultOffset * idx + 'rpx' }
			} else {
				offset.value[i] = { '--offset': -1 * defaultOffset * (classArray.value.length - 1 - idx) + 'rpx' }
			}
			classArray.value[i].pop();
			window.requestAnimationFrame(function(time) {
				classArray.value[i].push("animation-slide-leave");
			});
		}
	}


	const cancelAction = () => {
		if (activeIdx.value == -1) return;
		isShowReturn.value = false;
		for (let i = 0; i < classArray.value.length; i++) {
			classArray.value[i].pop();
			window.requestAnimationFrame(function(time) {
				classArray.value[i].push("animation-slide-into");
			});
		}
		activeIdx.value = -1;
	}
</script>

<template>
	<view class="box">
		<view class="all">
			<view class="timeline">
				<view :class="lineFront"></view>
				<view class="dot" :style="{ border: dotColor }"></view>
				<view :class="lineBack"></view>
			</view>
			<view class="action">
				<view class="action-inner">
					<uni-card is-full>
						<view class="status" v-if="props.status!='action'">
							<view class="first-row">
								<image class="icon" :src="statusIcon"></image>
								<view class="label">{{ statusText }}</view>
								<view class="action-time">{{ props.time }}</view>
							</view>
							<view class="second-row">
								<view class="action-detail" v-if="props.status=='evaluate'">
									<uni-rate allow-half readonly :value="props.detail" />
								</view>
								<view class="action-detail">{{ props.detail }}</view>
								<view class="action-staff">操作人：{{ props.operator }}</view>
							</view>

						</view>
						<view class="operation-box">
							<view class="operation" v-if="props.status=='action' && props.pre=='follow'">
								<view :class="classArray[0]" @click="doAction(0)" :style="offset[0]">
									<image class="icon" src="../static/icon/pages/clue/report/end.png"></image>
									<text class="card-actions-item-text">终止</text>
								</view>

								<view :class="classArray[1]" @click="doAction(1)" :style="offset[1]">
									<image class="icon" src="../static/icon/pages/clue/report/follow.png"></image>
									<text class="card-actions-item-text">跟进</text>
								</view>

								<view :class="classArray[2]" @click="doAction(2)" :style="offset[2]">
									<image class="icon" src="../static/icon/pages/clue/report/success.png"></image>
									<text class="card-actions-item-text">完成</text>
								</view>
								<uni-transition modeClass="fade" :show="isShowReturn"
									style="position: absolute;right: 10rpx;">
									<image src="../static/icon/pages/clue/report/return.png"
										style="width: 40rpx; height: 40rpx;" @click="cancelAction"></image>
								</uni-transition>
							</view>
							<view class="operation-detail" v-show="activeIdx!=-1"
								v-if="props.status=='action' && props.pre=='follow'">
								<uni-easyinput placeholder="操作说明" v-model="description"></uni-easyinput>
								<uni-section title="上传材料" type="line"></uni-section>
								<uni-file-picker v-model="descImgCopy" file-mediatype="image" limit="9"
									@select="selected" @delete="deleted"></uni-file-picker>
								<button type="primary" style="margin-top: 20rpx;" @click="submitAction">确定</button>
							</view>
							<view class="operation"
								v-if="props.status=='action' && props.pre=='success' && props.isReporter==true">
								<view class="operation-item">
									<text class="card-actions-item-text">评价 ： </text>
									<uni-rate allow-half v-model="rate" />
									<uni-icons style="margin-left: 20rpx;" type="checkbox" size="30"
										@click="submitRate"></uni-icons>
								</view>
							</view>
						</view>

						<view class="extra-img" v-show="!isFold">
							<uni-file-picker v-model="props.imgList" readonly file-mediatype="image"></uni-file-picker>
						</view>
					</uni-card>
					<view class="extra-btn" @click="changeFold()" v-if="props.imgList!=null && props.imgList.length!=0">
						<view class="btn-box">
							<view class="btn-text"> {{ btnText }} </view>
							<image class="btn-icon" :src="btnIcon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>



<style scoped lang="scss">
	$dangerous-mix-follow : mix($uni-color-error, $uni-color-warning, 50%);
	$follow-mix-success : mix($uni-color-warning, $uni-color-success, 50%);
	$dangerous-mix-end : mix($uni-color-error, gray, 50%);
	$follow-mix-end : mix($uni-color-warning, gray, 50%);
	$success-mix-evaluate : mix($uni-color-primary, $uni-color-success, 50%);




	@keyframes slide {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(var(--offset) * -1));
		}
	}


	.animation-slide-leave {
		animation: slide 0.5s;
		-webkit-animation: slide 0.5s;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
	}

	.animation-slide-into {
		animation: slide 0.5s;
		-webkit-animation: slide 0.5s;
		animation-direction: reverse;
		-webkit-animation-direction: reverse;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
	}



	.operation-detail {
		margin: 20rpx 0;
	}

	.extra-btn {
		display: flex;
		justify-content: flex-end;

		.btn-box {
			display: flex;
			align-items: center;
			background-color: white;
			padding: 4rpx 30rpx;
			border: 1px solid #ebeef5;
			border-top: 1px solid white;
			border-radius: 0 0 10px 10px;
			box-shadow: 0 1px 8px 1px rgba(165, 165, 165, 0.2);

			.btn-text {
				color: #999;
				font-size: $uni-font-size-base;
				margin-right: 4rpx;
			}

			.btn-icon {
				width: 25rpx;
				height: 25rpx;
			}
		}


	}

	.operation {
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
		padding: 20rpx 0;

		.operation-item {
			display: flex;
			align-items: center;

			.icon {
				width: 50rpx;
				height: 50rpx;
				margin-right: 5rpx;
			}

			.card-actions-item-text {
				font-size: $uni-font-size-lg;
			}
		}
	}

	.action-card {
		background: #e4e7ed;
	}

	.all {
		width: 100%;
		display: flex;
		align-items: stretch;

		.timeline {
			background-color: white;
			width: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			padding: 0 10rpx;
			flex-shrink: 0;

			.line-head {
				// background-color: #e4e7ed;
				position: absolute;
				top: 0;
				bottom: 50%;
				width: 10rpx;
				opacity: 0.7;
			}

			.dot {
				width: 10rpx;
				height: 10rpx;
				// border: 8rpx solid gray;
				border-radius: 50%;
				background-color: #e4e7ed;
				z-index: 1;
			}

			.line-tail {
				// background-color: #e4e7ed;
				position: absolute;
				top: 50%;
				bottom: 0;
				width: 10rpx;
				opacity: 0.7;
			}
		}

		.action {
			display: flex;
			background-color: white;
			flex-grow: 1;
			padding: 30rpx 0;
			padding-right: 50rpx;
			align-items: center;

			.action-inner {
				width: 100%;
			}
		}
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

	.dangerous-to-follow-front {
		background: linear-gradient($uni-color-error, $dangerous-mix-follow);
	}

	.dangerous-to-follow-back {
		background: linear-gradient($dangerous-mix-follow, $uni-color-warning);
	}

	.follow-to-dangerous-front {
		background: linear-gradient($uni-color-warning, $dangerous-mix-follow);
	}

	.follow-to-dangerous-back {
		background: linear-gradient($dangerous-mix-follow, $uni-color-error);
	}

	.follow-to-follow {
		background: $uni-color-warning;
	}

	.follow-to-success-front {
		background: linear-gradient($uni-color-warning, $follow-mix-success);
	}

	.follow-to-success-back {
		background: linear-gradient($follow-mix-success, $uni-color-success);
	}

	.success-to-evaluate-front {
		background: linear-gradient($uni-color-success, $success-mix-evaluate);
	}

	.success-to-evaluate-back {
		background: linear-gradient($success-mix-evaluate, $uni-color-primary);
	}

	.dangerous-to-end-front {
		background: linear-gradient($uni-color-error, $dangerous-mix-end);
	}

	.dangerous-to-end-back {
		background: linear-gradient($dangerous-mix-end, gray);
	}

	.follow-to-end-front {
		background: linear-gradient($uni-color-warning, $follow-mix-end);
	}

	.follow-to-end-back {
		background: linear-gradient($follow-mix-end, gray);
	}
</style>