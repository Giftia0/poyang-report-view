<template>
	<view class="box">
		<uv-sticky bgColor="#fff">
			<uv-tabs :list="tabbar" :customStyle="{backgroundColor: 'white'}" :scrollable="false" @change="tabChange"></uv-tabs>
			<view class="filter">
				<zb-dropdown-menu style="width: 100%">
					<zb-dropdown-item name="1" :options="option" v-model="dropdownStatus"
						@change="getReportByStatusAndTime()"></zb-dropdown-item>
					<zb-dropdown-item name="2" :options="optionTime" v-model="dropdownTime"
						@change="getReportByStatusAndTime()"></zb-dropdown-item>
				</zb-dropdown-menu>
			</view>
		</uv-sticky>
		<view class="report-list">
			<ReportListItem v-for="item in list" :key="item.id" :title="item.title" :detail="item.detail"
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
	import { getMyReport ,getToDoReport } from '../../http/api/report.js'

	const list = ref([]);
	var lastVisit;

	const category = ref(0);

	onLoad(() => {
		getToDoReport(category.value).then(res => {
			list.value = res.data.data;
		});
	})

	const getReportByStatusAndTime = () => {
		getToDoReport(category.value, dropdownStatus.value, dropdownTime.value, lastVisit).then(res => {
			list.value = res.data.data;
		})
	}

	const dropdownStatus = ref(0);
	const optionStatus = [{
			text: '所有状态',
			value: 0
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
			text: '已评价',
			value: 5
		},
		{
			text: '已终止',
			value: 4
		},
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
	const option = computed(()=>{
		return category.value == 0 ? optionStatus : optionStatusBrief;
	})
	const tabbar = ref([{
			name: '线索',
		},
		{
			name: '咨询',

		},
		{
			name: '反馈',
		}
	]);
	const tabChange = (e) => {
		console.log(e)
		category.value = e.index;
		getReportByStatusAndTime();
	}

	const toReportDetail = (reportId) => {
		if (category.value == 0)
			uni.navigateTo({
				url: '/pages/ReportDetail/ReportDetail?id=' + reportId
			})
		if (category.value == 1)
			uni.navigateTo({
				url: '/pages/ConsultDetail/ConsultDetail?id=' + reportId
			})
		if (category.value == 2)
			uni.navigateTo({
				url: '/pages/ConsultDetail/ConsultDetail?id=' + reportId
			})
	}
</script>

<style scoped lang="scss">

</style>