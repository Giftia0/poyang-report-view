<script setup>
	import * as echarts from 'echarts';
	import { computed, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { getPieChartData, getBarChartData } from '../../http/api/report.js'
	import moment from 'moment'

	onLoad(() => {
		updatePie();
		updateBar();
	})


	const now = moment().format("YYYY-MM-DD");
	const fisrtDayOfMonth = moment().startOf("month").format("YYYY-MM-DD");
	const range = ref([fisrtDayOfMonth, now]);

	const selectValue = ref(2);
	const select = ref([
		{ value: 0, text: "年" },
		{ value: 1, text: "月" },
		{ value: 2, text: "日" },
	])
	
	const totalPie = ref(0);

	const changeDate = (e) => {
		console.log(range.value)
		console.log(selectValue.value)
		updatePie();
		updateBar();
	}

	const changeSelect = (e) => {
		console.log(range.value)
		console.log(selectValue.value)
		updateBar();
	}



	// 基于准备好的dom，初始化echarts实例
	var optionPie = {
		tooltip: {
			trigger: 'item',
		},
		// graphic: {
		// 	type: 'text',
		// 	right: '15%',
		// 	bottom: '5%',
		// 	style: {
		// 		text: '总数: ' + totalPie.value,
		// 		textAlign: 'center',
		// 		fill: '#333',
		// 		width: 30,
		// 		height: 30,
		// 		textFont: 'bolder 16px sans-serif'
		// 	}
		// },
		legend: {
			right: '5%',
			orient: 'vertical',
			top: 'center',
			selectedMode: false,
		},
		series: [{
			center: ['30%', '50%'],
			name: '线索类型',
			type: 'pie',
			radius: ['40%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 10,
				borderColor: '#fff',
				borderWidth: 2
			},
			label: {
				show: true,
				position: 'inside',
				formatter: function(params) {
					// 根据数据值格式化标签  
					if (params.value === 0) {
						// 如果值为0，则不显示标签  
						return '';
					} else {
						// 如果值不为0，则显示百分比形式的标签  
						var percent = params.value / totalPie.value * 100;
						return percent.toFixed(1) + '%'; // 保留两位小数并添加百分号  
					}
				}
			},
			data: [
				{ value: 148, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 484, name: 'Union Ad' },
				{ value: 300, name: 'Video Ads' }
			],
		}]
	};
	var myChartPie;
	setTimeout(() => {
		var chartDomPie = document.getElementById('pie');
		myChartPie = echarts.init(chartDomPie);
		optionPie && myChartPie.setOption(optionPie);
	})
	
	const updatePie = () => {
		totalPie.value = 0;
		getPieChartData(range.value[0], range.value[1]).then(res => {
			optionPie.series[0].data = res.data.data;
			optionPie.series[0].data.forEach((item) => {
				totalPie.value += item.value;
			})
			optionPie && myChartPie.setOption(optionPie);
		})
	}




	var optionBar = {
		tooltip: {
			trigger: 'item',
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
				'Sun'
			]
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' }
				])
			},
			data: [
				120,
				{
					value: 200,
					itemStyle: {
						color: '#a90000'
					}
				},
				150,
				80,
				70,
				110,
				130,
				{
					value: 200,
					itemStyle: {
						color: '#a90000'
					}
				},
				150,
				80,
				70,
				110,
				130
			],
			type: 'bar'
		}],
		dataZoom: [{
			type: 'inside', // 内置于坐标系中
			start: 0,
			end: 100,
			xAxisIndex: [0]
		}]
	};
	var myChartBar;
	setTimeout(() => {
		var chartDomBar = document.getElementById('bar');
		myChartBar = echarts.init(chartDomBar);
		optionBar && myChartBar.setOption(optionBar);
	})
	const updateBar = () => {
		getBarChartData(range.value[0], range.value[1], selectValue.value).then(res => {
			let dataList = [];
			if (selectValue.value == 0) {
				dataList = fillDataByYears(res.data.data)
			} else if (selectValue.value == 1) {
				dataList = fillDataByMonths(res.data.data)
			} else {
				dataList = fillDataByDays(res.data.data)
			}
			optionBar.xAxis.data = dataList.map(data => data.date);
			optionBar.series[0].data = dataList.map(data => data.value);
			optionBar && myChartBar.setOption(optionBar);
		})
	}


	const fillDataByDays = (data) => {
		let start = moment(range.value[0]);
		let end = moment(range.value[1]).add(1, "days");
		let idx = 0;
		let dataList = [];
		while (start.format("YYYY-MM-DD") != end.format("YYYY-MM-DD")) {
			if (idx >= data.length || start.format("YYYY-MM-DD") != moment(data[idx].date).format(
					"YYYY-MM-DD")) {
				let obj = {
					date: start.format("YYYY-MM-DD"),
					value: 0
				}
				dataList.push(obj);
			} else {
				data[idx].value = parseInt(data[idx].value);
				dataList.push(data[idx]);
				idx++;
			}
			start.add(1, "days");
		}
		return dataList;
	}

	const fillDataByMonths = (data) => {
		let start = moment(range.value[0]);
		let end = moment(range.value[1]).add(1, "months");
		let idx = 0;
		let dataList = [];
		while (start.format("YYYY-MM") != end.format("YYYY-MM")) {
			if (idx >= data.length || start.format("YYYY-MM") != moment(data[idx].date).format(
					"YYYY-MM")) {
				let obj = {
					date: start.format("YYYY-MM"),
					value: 0
				}
				dataList.push(obj);
			} else {
				data[idx].value = parseInt(data[idx].value);
				dataList.push(data[idx]);
				idx++;
			}
			start.add(1, "months");
		}
		return dataList;
	}

	const fillDataByYears = (data) => {
		let start = moment(range.value[0]);
		let end = moment(range.value[1]).add(1, "years");
		let idx = 0;
		let dataList = [];
		while (start.format("YYYY") != end.format("YYYY")) {
			if (idx >= data.length || start.format("YYYY") != moment(data[idx].date).format(
					"YYYY")) {
				let obj = {
					date: start.format("YYYY"),
					value: 0
				}
				dataList.push(obj);
			} else {
				data[idx].value = parseInt(data[idx].value);
				dataList.push(data[idx]);
				idx++;
			}
			start.add(1, "years");
		}
		return dataList;
	}
</script>

<template>
	<view class="container">
		<view class="header">
			<uni-datetime-picker v-model="range" type="daterange" :clearIcon="false" @change="changeDate" />
		</view>
		<view class="pie-chart">
			<uni-section title="线索类型占比" type="square" style="border-bottom: 1px solid #ededed;">
				<template v-slot:right>
					<view style="display: flex;align-items: center;margin-right: 20rpx;font-size: 12px;">
						总数：{{ totalPie }}
					</view>
				</template>
			</uni-section>
			<view id="pie" style="height:400rpx;"></view>
		</view>
		<view class="bar-chat">
			<uni-section title="线索数量统计" type="square" style="border-bottom: 1px solid #ededed;">
				<template v-slot:right>
					<view style="display: flex;align-items: center;">
						切换视图：
						<uni-data-select v-model="selectValue" :localdata="select" @change="changeSelect"
							:clear="false"></uni-data-select>
					</view>
				</template>
			</uni-section>
			<view id="bar" style="height:95%;width: 105%;"></view>
		</view>
	</view>
</template>



<style lang="scss" scoped>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		background: linear-gradient(#4a97f3, #7f62d9);

		.header {
			display: flex;
			align-items: center;
			margin-top: 30rpx;

		}

		.pie-chart {
			height: 500rpx;
			width: 100%;
			background-color: white;
			margin-top: 40rpx;
			border-radius: 15px;
			overflow: hidden;
		}

		.bar-chat {
			flex: 1;
			margin-bottom: 30rpx;
			width: 100%;
			background-color: white;
			margin-top: 60rpx;
			border-radius: 15px;
			overflow: hidden;
		}

	}
</style>