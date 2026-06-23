<script setup>
	import { getAuthInfo } from '../../http/api/user.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { reactive, ref } from 'vue';

	onLoad(() => {
		getAuthInfo().then(res => {
			info.value = res.data.data
		})
	})

	const info = ref({
		name: '',
		sex: '',
		address: '',
		num: '',
		expiredDate: '',
		institution: ''
	})
</script>

<template>
	<view class="box">
		<uni-section title="个人基本信息" type="line">
			<uni-list>
				<uni-list-item title="姓名" :rightText="info.name" />
				<uni-list-item title="性别" :rightText="info.sex" />
				<uni-list-item title="地址" :rightText="info.address" />
			</uni-list>
		</uni-section>
		<view class="mb-40"></view>
		<uni-list>
			<uni-list-item title="身份证号" :rightText="info.num" />
			<uni-list-item title="有效期至" :rightText="info.expiredDate" />
			<uni-list-item title="签发机关" :rightText="info.institution" />
		</uni-list>
	</view>
</template>

<style scoped>
	.mb-40 {
		height: 40rpx;
	}
</style>