<script setup>
	import { clearAuthRecord, checkAuthRecord } from '../../http/api/user.js'
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app';
	import { resourceURL } from '../../config.js'
	import { baseURL } from '../../http/index.js'
	import { useUserStore } from '../../store/user.js'

	const userStore = useUserStore();

	onLoad(() => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		clearAuthRecord().then(res => {
			uni.hideLoading();
		});
	})

	const srcFace = ref('');
	const srcBack = ref('');
	var flagFace = true;
	var flagBack = true;
	const name = ref('');
	const num = ref('');

	const btnStatus = computed(() => {
		return (srcFace.value == '' || srcBack.value == '') ? false : true
	})
	const btnColor = computed(() => {
		return (srcFace.value == '' || srcBack.value == '') ? '#c0c0c0' : '#2b3e6a'
	})

	const uploadIdcardImg = (side) => {
		if (side == 'face' && flagFace == false) return;
		if (side == 'back' && flagBack == false) return;
		uni.chooseImage({
			count: 1,
			success(res) {
				if (side == 'face') flagFace = false;
				else flagBack = false;
				const tempFilePaths = res.tempFilePaths;
				const uploadTask = uni.uploadFile({
					url: baseURL + '/user/uploadIdcard',
					filePath: tempFilePaths[0],
					name: 'multipartFile',
					header: {
						Authorization: uni.getStorageSync('token')
					},
					formData: {
						'side': side
					},
					success: uploadFileRes => {
						if (side == 'face') flagFace = true;
						else flagBack = true;
						clock1 = setInterval(() => {
							if (side == 'face') percent1.value += 1;
							else percent2.value += 1;
						}, 50);
						setTimeout(() => {
							clearInterval(clock1)
						}, 1000)
						const data = JSON.parse(uploadFileRes.data);
						console.log(data)
						if (data.code != 200) {
							uni.showToast({
								title: data.msg,
								icon: "error"
							})
							if (side == 'face') {
								percent1.value = 0;
								srcFace.value = '';
								name.value = '';
								num.value = '';
							} else {
								percent2.value = 0;
								srcBack.value = '';
							}
							clearInterval(clock1);
							clearInterval(clock2);
							return;
						}
						const record = data.data;
						if (side == 'back') srcBack.value = resourceURL + record.img;
						if (side == 'face') {
							srcFace.value = resourceURL + record.img;
							const info = JSON.parse(record.info);
							name.value = info.name;
							num.value = info.num;
						}
					}
				});
				uploadTask.onProgressUpdate((res) => {
					if (side == 'face') percent1.value = res.progress * 0.4;
					else percent2.value = res.progress * 0.4;
					if (res.progress == 100) {
						clock2 = setInterval(() => {
							if (side == 'face') percent1.value += 0.25;
							else percent2.value += 0.25;
						}, 50);
						setTimeout(() => {
							clearInterval(clock2)
						}, 8000)
					}
				});
			}
		})
	}
	const percent1 = ref(0);
	const percent2 = ref(0);
	var clock1, clock2;

	const submit = () => {
		if (!btnStatus) return;
		checkAuthRecord().then(res => {
			uni.showToast({
				title: res.data.msg,
				icon: "success"
			})
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/AuthInfo/AuthInfo'
				})
			}, 1500)
			userStore.getUserInfo();
		});
	}
</script>

<template>
	<view class="box">

		<view class="card">
			<view class="card-img card-a" @click="uploadIdcardImg('face')">
				<image class="card-img" :src="srcFace"></image>
			</view>
			<view class="card-tip">
				<view class="card-tip-title">上传身份证人像面</view>
				<view class="card-tip-text">请保持照片中身份证显示完整，字体清晰可见，亮度均匀</view>
			</view>
		</view>
		<view class="progress-box">
			<progress :percent="percent1" activeColor="#047ff2" stroke-width="3" />
		</view>

		<view class="card">
			<view class="card-img card-b" @click="uploadIdcardImg('back')">
				<image class="card-img" :src="srcBack"></image>
			</view>
			<view class="card-tip">
				<view class="card-tip-title">上传身份证国徽面</view>
				<view class="card-tip-text">请保持照片中身份证显示完整，字体清晰可见，亮度均匀</view>
			</view>
		</view>
		<view class="progress-box">
			<progress :percent="percent2" activeColor="#047ff2" stroke-width="3" />
		</view>

		<view class="info">
			<view class="info-tip">上传身份证图片自动填充</view>
			<view class="info-text">
				<view class="label">姓名</view>
				<view class="content">{{ name }}</view>
			</view>
			<view class="info-text">
				<view class="label">身份证号</view>
				<view class="content">{{ num }}</view>
			</view>
		</view>

		<view class="confirm" :style="{backgroundColor: btnColor}">
			<view class="confirm-text" @click="submit()">提交认证</view>
		</view>

	</view>
</template>

<style lang="scss" scoped>
	.confirm {
		margin: 0 30rpx;
		height: 100rpx;
		border-radius: $uni-border-radius-base;
		// background-color: #2b3e6a;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;

		.confirm-text {
			font-size: 32rpx;
			color: white;
		}
	}

	.info {
		margin-top: 0rpx;

		.info-tip {
			padding: 30rpx;
			color: $uni-text-color-placeholder;
		}

		.info-text {
			height: 100rpx;
			margin-bottom: 4rpx;
			background-color: white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;

			.content {
				width: 400rpx;
			}
		}
	}

	.card {
		padding-left: 30rpx;
		background-color: white;
		height: 260rpx;
		display: flex;
		align-items: center;
		margin-bottom: 4rpx;

		.card-img {
			height: 189rpx;
			width: 300rpx;
			border-radius: $uni-border-radius-lg;
			background-size: 30%, 100%;
			background-repeat: no-repeat;
			background-position: center;
		}

		.card-a {
			background-image: url('/static/icon/pages/auth/add.png'), url('/static/icon/pages/auth/idcard-a.jpg');
		}

		.card-b {
			background-image: url('/static/icon/pages/auth/add.png'), url('/static/icon/pages/auth/idcard-b.jpg');
		}

		.card-tip {
			margin-left: 40rpx;

			.card-tip-title {
				font-size: 36rpx;
				margin-bottom: 20rpx;
				// font-family: 华文琥珀;
				color: #464646;
			}

			.card-tip-text {
				width: 350rpx;
				color: $uni-text-color-placeholder;
				font-weight: 100;
				// font-family: 华文新魏;
			}
		}
	}
</style>