<script setup>
	import { computed, ref, onMounted } from 'vue';
	import { useUserStore } from '../../store/user.js';
	import { onShow } from '@dcloudio/uni-app';
	import { storeToRefs } from 'pinia'
	import { resourceURL } from '../../config.js';


	const userStore = useUserStore();
	const { user } = storeToRefs(userStore);
	const defaultAvatar = resourceURL + '/avatar/default-avatar.png';

	const avatarUrl = computed(() => {
		return user.value.avatar == '' ? defaultAvatar : resourceURL + user.value.avatar;
	});
	const username = computed(() => {
		return user.value.username != '' ? user.value.username : '登录/注册';
	});

	const goToLogin = () => {
		if (user.value.id != '') return;
		uni.navigateTo({
			url: '/pages/LoginPage/LoginPage'
		});
	};

	const goToAuth = () => {
		if (user.value.isAuth == 0) {
			uni.navigateTo({
				url: '/pages/AuthPage/AuthPage'
			});
		} else {
			uni.navigateTo({
				url: '/pages/AuthInfo/AuthInfo'
			})
		}

	};
	
	const goToDo = () => {
		uni.navigateTo({
			url: '/pages/WorkBoard/WorkBoard'
		});
	};


	const exit = () => {
		uni.showModal({
			title: '退出登录',
			content: '确认要退出当前账号吗？',
			confirmColor: 'red',
			success: function(res) {
				if (res.confirm) {
					console.log('点击了确认')
					userStore.exitLogin();
				}
			}
		})

	}
</script>

<template>
	<view class="user-bar">
		<image class="user-avatar" :src="avatarUrl" @click="goToLogin()"></image>
		<view class="user-name" @click="goToLogin()">{{ username }}</view>
	</view>
	<view class="about-list">
		<view class="about-item" @click="goToAuth()">
			<image class="icon" src="../../static/icon/pages/user/id-card.png"></image>
			<view class="text">实名认证</view>
			<view class="label" v-if="user.isAuth == 1">( 已实名 )</view>
		</view>
		<view class="about-item" @click="goToDo()">
			<image class="icon" src="../../static/icon/pages/user/workboard.png"></image>
			<view class="text">我的待办</view>
		</view>
		<view class="about-item" @click="goToSetting()">
			<image class="icon" src="../../static/icon/pages/user/setting.png"></image>
			<view class="text">设置</view>
		</view>
	</view>
	<view class="exit">
		<view class="exit-text" @click="exit()">退出登录</view>
	</view>
</template>

<style scoped lang="scss">
	.exit {
		height: 80rpx;
		background-color: $uni-bg-color;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;

		.exit-text {
			font-size: 32rpx;
			color: $uni-color-error;
		}
	}

	.user-bar {
		display: flex;
		align-items: center;
		width: 101%;
		height: 200rpx;
		background-color: $uni-color-primary;
	}

	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border: 6rpx solid white;
		border-radius: 50%;
		margin-left: 40rpx;
		background-color: #eaeaea;
	}

	.user-name {
		color: white;
		padding: 50rpx;
	}

	.about-item {
		padding-left: 40rpx;
		height: 80rpx;
		background-color: white;
		display: flex;
		align-items: center;
		margin-top: 5rpx;

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.text {
			margin-left: 50rpx;
		}

		.label {
			color: $uni-color-primary;
			margin-left: auto;
			margin-right: 70rpx;
		}
	}
</style>