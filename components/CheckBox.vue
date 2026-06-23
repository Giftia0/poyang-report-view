<template>
	<view class="box">
		<view class="type">
			<uni-section class="title" :title="text" title-font-size="16px" type="square"></uni-section>
			<radio-group class="radio-group" @change="radioChange">
				<radio v-for="item in props.category.types " :key="item" class="radio" :value="item">{{ item }}</radio>
			</radio-group>
		</view>
	</view>
</template>

<script setup>
	import { defineEmits } from 'vue'

	const emit = defineEmits(['msg'])

	const props = defineProps(['category']);
	const text = '请选择' + (props.category.title || '') + '类别';

	const radioChange = (e) => {
		console.log(e);
		emit('msg', e.detail.value);
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 0;
	}

	.type {
		width: 100%;
		background-color: white;
		border-radius: $uni-border-radius-lg;
	}

	.radio-group {
		display: flex;
		flex-wrap: wrap;

		.radio {
			width: 33%;
			margin-bottom: 10rpx;
			transform: scale(0.8);
		}
	}
</style>