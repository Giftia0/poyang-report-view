<template>
	<view class="box">
		<uni-list-item style="height: 280rpx;" direction="column">
			<template v-slot:header>
				<view class="slot-box">
					<view class="slot-box-inner">
						<view class="title">
							<view class="label" :style="{backgroundColor: labelColor}">
								{{ statusTextHandler(props.status) }}</view>
							{{ props.title }}
						</view>
						<view class="content">
							{{ props.detail }}
						</view>
					</view>
					<image class="slot-image" v-if="props.township!=''"
						:src=" 'https://restapi.amap.com/v3/staticmap?location=' + props.lng + ',' + props.lat + '&zoom=8&size=100*200&markers=mid,,O:' + props.lng + ',' + props.lat + '&key=ae60883bdbc1a4683743d39e168a912c' "
						mode="aspectFill"></image>
				</view>
			</template>
			<template v-slot:footer>
				<view class="footer">
					<view class="time">{{ dateFormat(props.time) }}</view>
					<view class="type">{{ props.type }}</view>
					<view class="township" v-if="props.township!=''">{{ props.township }}</view>
				</view>
			</template>
		</uni-list-item>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { statusTextHandler, statusIconHandler, statusColorHandler } from '../utils/status.js'
	import dateFormat from '../utils/dataFormatter.js'

	const props = defineProps(['title', 'detail', 'lng', 'lat', 'type', 'township', 'status', 'time']);

	const report = ref({
		title: '标题标题标题标题标题标题标',
		detail: '详情详情详情详情详情详情详情详情详情详情详情详情详情详情',
		lng: '116.327214',
		lat: '28.851754',
		type: '电鱼炸鱼',
		township: '瑞洪镇',
		status: '待解决',
		time: '2024-04-12 13:58:58'
	})


	const labelColor = computed(() => {
		return statusColorHandler(props.status);
	})
</script>

<style scoped lang="scss">
	.footer {
		display: flex;
		margin-top: 10rpx;

		.time {
			color: $uni-text-color-placeholder;
		}

		.township {
			margin-left: 15rpx;
			padding: 5rpx;
			background-color: rgba(64, 158, 255, 0.8);
			color: white;
			padding: 10rpx;
			border-radius: $uni-border-radius-sm;
			margin-right: 10rpx;
		}

		.type {
			margin-left: auto;
			background-color: rgba(54, 79, 134, 0.8);
			color: white;
			padding: 10rpx;
			border-radius: $uni-border-radius-sm;
		}
	}

	.slot-image {
		width: 150rpx;
		height: 150rpx;
		margin-left: auto;
		margin-right: 10rpx;
		border-radius: $uni-border-radius-lg;
		border: 2px solid $uni-border-color;
	}

	.slot-box {
		display: flex;
		padding: 10rpx 0;
	}

	.title {
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
	}

	.label {
		font-size: $uni-font-size-base;
		color: white;
		padding: 8rpx;
		border-radius: $uni-border-radius-lg;
		margin-right: 10rpx;
	}

	.content {
		width: 500rpx;
		font-size: $uni-font-size-paragraph;
		color: $uni-color-subtitle;
		display: -webkit-box;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}
</style>