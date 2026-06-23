export const statusList = {
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

export const statusIconHandler = (status) => {
	if (status == 'success') return statusList.success.icon;
	if (status == 'dangerous') return statusList.dangerous.icon;
	if (status == 'follow') return statusList.follow.icon;
	if (status == 'end') return statusList.end.icon;
	if (status == 'evaluate') return statusList.evaluate.icon;
}

export const statusTextHandler = (status) => {
	if (status == 'success') return statusList.success.text;
	if (status == 'dangerous') return statusList.dangerous.text;
	if (status == 'follow') return statusList.follow.text;
	if (status == 'end') return statusList.end.text;
	if (status == 'evaluate') return statusList.evaluate.text;
}

export const statusColorHandler = (status) => {
	if (status == 'success') return '#4cd964';
	if (status == 'dangerous') return '#dd524d';
	if (status == 'follow') return '#f0ad4e';
	if (status == 'end') return 'gray';
	if (status == 'evaluate') return '#047ff2';
}