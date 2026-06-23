<template>
	<view class="box">
		<uv-sticky bgColor="#fff">
			<uni-search-bar v-model="searchInput" radius="5" placeholder="输入工单编号搜索" clearButton="always"
				cancelButton="none" @input="search" />
			<view class="filter">
				<zb-dropdown-menu style="width: 100%">
					<zb-dropdown-item v-if="category==0" name="1" :options="optionStatus" v-model="dropdownStatus"
						@change="getReportByStatusAndTime()"></zb-dropdown-item>
					<zb-dropdown-item v-else name="1" :options="optionStatusBrief" v-model="dropdownStatus"
						@change="getReportByStatusAndTime()"></zb-dropdown-item>
					<zb-dropdown-item name="2" :options="optionTime" v-model="dropdownTime"
						@change="getReportByStatusAndTime()"></zb-dropdown-item>
				</zb-dropdown-menu>
			</view>
		</uv-sticky>
		<view class="report-list">
			<ReportListItem v-for="item in filterList" :key="item.id" :title="item.title" :detail="item.detail"
				:lng="item.lng" :lat="item.lat" :type="item.type" :township="item.township"
				:status="item.latestStatus.status" :time="item.createTime" @click="toReportDetail(item.id)">
			</ReportListItem>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import ReportListItem from '../../components/ReportListItem.vue'
	import { getReportList } from '../../http/api/report.js'

	const list = ref([]);
	var lastVisit;

	const category = ref(0);

	onLoad((opt) => {
		dropdownStatus.value = parseInt(opt.status);
		dropdownTime.value = parseInt(opt.time);
		getReportList(category.value, dropdownStatus.value, dropdownTime.value, lastVisit).then(res => {
			list.value = res.data.data;
			console.log(list.value)
		});
		lastVisit = uni.getStorageSync('lastVisit');
		uni.setStorageSync('lastVisit', new Date().getTime())
	})

	const getReportByStatusAndTime = () => {
		getReportList(category.value, dropdownStatus.value, dropdownTime.value, lastVisit).then(res => {
			console.log(res.data)
			list.value = res.data.data;
		})
	}

	const dropdownStatus = ref(0);
	const optionStatus = [{
			text: '所有状态',
			value: 0
		},
		{
			text: '待解决',
			value: 1
		},
		{
			text: '跟进中',
			value: 2
		},
		{
			text: '已解决',
			value: 3
		},
		{
			text: '已终止',
			value: 4
		},
		{
			text: '已评价',
			value: 5
		}
	];
	const optionStatusBrief = [{
			text: '所有状态',
			value: 0
		},
		{
			text: '待解决',
			value: 1
		},
		{
			text: '已解决',
			value: 3
		}
	];
	const dropdownTime = ref(0);
	const optionTime = [{
			text: '时间不限',
			value: 0
		},
		{
			text: '今天',
			value: 1
		},
		{
			text: '近一周',
			value: 2
		},
		{
			text: '近一个月',
			value: 3
		},
		{
			text: '近半年',
			value: 4
		},
		{
			text: '近一年',
			value: 5
		},
	];

	const toReportDetail = (reportId) => {
		uni.navigateTo({
			url: '/pages/ReportDetail/ReportDetail?id=' + reportId
		})
	}

	const searchInput = ref('');
	const filterList = computed(() => {
		if (searchInput.value == '') return list.value;
		return list.value.filter(item => {
			return item.id.includes(searchInput.value);
		})
	});
	const search = (e) => {
		console.log(e)
		console.log(searchInput.value)
	}
</script>

<style scoped lang="scss">

</style>