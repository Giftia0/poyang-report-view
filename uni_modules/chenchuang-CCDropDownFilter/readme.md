### 我的技术微信公众号

查看更多前端组件和框架信息，请关注我的技术微信公众号【前端组件开发】

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)

# chenchuang-CCDropDownFilter

#### 使用方法 
```使用方法
<view style="width: 100vw; height: 40px; background-color: white;">

 <!-- filterData:筛选数据  defaultIndex： 默认选择序列 @onSelected:选择事件 返回选择的值-->
<chenchuang-CCDropDownFilter :filterData='filterData' :defaultIndex='defaultIndex'
			@onSelected='onSelected'></chenchuang-CCDropDownFilter>

</view>

```

#### HTML代码实现部分
```html
<template>
	<view class="content">

		<view style="margin-top: 16px;">

			<view style="width: 100vw; height: 40px; background-color: white;">
				<!-- filterData:筛选数据  defaultIndex： 默认选择序列 @onSelected:选择事件 返回选择的值-->
				<chenchuang-CCDropDownFilter :filterData='filterData' :defaultIndex='defaultIndex'
					@onSelected='onSelected'></chenchuang-CCDropDownFilter>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		components: {



		},
		data() {
			return {

				filterData: [
					[{
						name: '全省',
						value: ''
					}],


					[{
							name: '美食',
							value: ''
						},
						{
							name: '湘菜',
							value: '1'
						},
						{
							name: '川菜',
							value: '2'
						},
						{
							name: '火锅',
							value: '3'
						}
					],

					[{
							name: '排序',
							value: ''
						},
						{
							name: '好评优先',
							value: '1'
						},
						{
							name: '销量优先',
							value: '2'
						},
						{
							name: '低价优先',
							value: '3'
						}
					],

					[{
							name: '筛选',
							value: ''
						},
						{
							name: '筛选1',
							value: '1'
						},
						{
							name: '筛选2',
							value: '2'
						}
					],
				],
				defaultIndex: [0, 0, 0, 0]







			}
		},

		mounted() {

			let cityArr = ['广州市', '深圳市', '佛山市', '东莞市', '中山市', '珠海市', '江门市', '肇庆市', '惠州市', '汕头市', '潮州市', '揭阳市', '汕尾市',
				'湛江市', '茂名市', '阳江市', '云浮市', '韶关市', '清远市', '梅州市', '河源市'
			]
			let tmpArr = this.filterData;
			for (let s of cityArr) {

				tmpArr[0].push({
					name: s,
					value: s
				});
				console.log("s = ", s);
			}
			console.log("filterData = " + JSON.stringify(this.filterData));

			this.filterData = tmpArr;




		},
		methods: {

			onSelected(res) {

				console.log('选择res = ' + JSON.stringify(res));
				uni.showModal({
					title: '下拉筛选选择数据',
					content: '所选择数据 = ' + JSON.stringify(res)
				})
			},


		}
	}
</script>

<style scoped>
	page {

		background-color: '#F6F7FA';
	}

	.content {
		display: flex;
		flex-direction: column;
		/* background-color: white; */


	}

	.mui-content-padded {
		margin: 6px 14px;
		/* background-color: #ffffff; */
	}

	.lineV {

		margin-top: 0px;
		margin-left: 15px;
		width: calc(100vw - 30px);
		height: 1px;
		background-color: #F5F5F5;

	}

	.hotSearchTitV {
		margin-left: 14px;
		margin-top: 4px;
		width: 170px;
		height: 22px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #161616;
		line-height: 22px;
	}

	.upView {
		display: flex;
		flex-direction: row;
		height: 26px;
		margin-left: 0px;
	}

	.cellView {
		margin-top: 4px;
		margin-left: 5.8px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		border-radius: 2px;
		padding: 0px 4px !important;
		font-size: 10px;

		background-color: #f5f5f5;
		color: #818183;
	}

	.moreBtn {

		height: 30px;
		/* background-color: #F5F5F5; */
		text-align: center;
		font-size: 12px;
		line-height: 30px;
		color: #888888;
	}
</style>

```



