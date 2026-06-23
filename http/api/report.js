import { myRequest, baseURL } from '../index.js'

const urlHead = '/report'

export const addReport = (report) => {
	let copy = { ...report };
	delete copy.img;
	return myRequest({
		method: 'post',
		url: urlHead + '/addReport',
		data: copy
	})
}

export const addReportImg = (path, index, reportId) => {
	uni.uploadFile({
		url: baseURL + urlHead + '/addReportImg',
		filePath: path,
		name: 'multipartFile',
		header: {
			Authorization: uni.getStorageSync('token')
		},
		formData: {
			index,
			reportId
		},
		success: uploadFileRes => {
			const data = JSON.parse(uploadFileRes.data);
			if (data.code != 200) {
				uni.showToast({
					title: data.msg,
					icon: "error"
				})
			}
		}
	});
}

export const getMyReport = (category, status, time, lastVisit) => {
	return myRequest({
		url: urlHead + '/getMyReport' +
			(category != null ? '?category=' + category : '') +
			(status != null ? '&status=' + status : '') +
			(time != null ? '&time=' + time : '') +
			(lastVisit != null ? '&lastVisit=' + lastVisit : '')
	})
}

export const getToDoReport = (category, status, time, lastVisit) => {
	return myRequest({
		url: urlHead + '/getToDoReport' +
			(category != null ? '?category=' + category : '') +
			(status != null ? '&status=' + status : '') +
			(time != null ? '&time=' + time : '') +
			(lastVisit != null ? '&lastVisit=' + lastVisit : '')
	})
}

// export const getMyReportByStatusAndTime = (status, time, lastVisit) => {
// 	return myRequest({
// 		url: urlHead + '/getMyReportByStatusAndTime' +
// 			'?' + 'status=' + status +
// 			'&' + 'time=' + time +
// 			'&' + 'lastVisit=' + lastVisit,
// 	})
// }

export const getReportList = (category, status, time, lastVisit) => {
	return myRequest({
		url: urlHead + '/getReportList' +
			(category != null ? '?category=' + category : '') +
			(status != null ? '&status=' + status : '') +
			(time != null ? '&time=' + time : '') +
			(lastVisit != null ? '&lastVisit=' + lastVisit : '')
	})
}

export const getReportDetail = (id) => {
	return myRequest({
		url: urlHead + '/getReportDetail' +
			'?' + 'reportId=' + id,
	})
}

export const addToDo = (reportId) => {
	return myRequest({
		url: urlHead + '/addToDo?reportId=' + reportId,
	})
}


export const removeToDo = (reportId, content) => {
	return myRequest({
		url: urlHead + '/removeToDo?reportId=' + reportId + '&content=' + content,
	})
}

export const getReportStatusList = (reportId) => {
	return myRequest({
		url: urlHead + '/getReportStatusList?id=' + reportId,
	})
}

export const getReportDataView = () => {
	return myRequest({
		url: urlHead + '/getReportDataView',
	})
}

export const getPieChartData = (start, end) => {
	return myRequest({
		url: urlHead + '/getPieChartData?start=' + start + '&end=' + end,
	})
}

export const getBarChartData = (start, end, viewMode) => {
	return myRequest({
		url: urlHead + '/getBarChartData?start=' + start + '&end=' + end + '&viewMode=' + viewMode,
	})
}

export const getLatestStatus = (reportId) => {
	return myRequest({
		url: urlHead + '/getLatestStatus?id=' + reportId,
	})
}


export const addStatus = (status, action, reportId) => {
	return myRequest({
		method: 'post',
		url: urlHead + '/addStatus',
		data: {
			status,
			action,
			reportId
		}
	})
}

export const addStatusImg = (path, index, statusId) => {
	uni.uploadFile({
		url: baseURL + urlHead + '/addStatusImg',
		filePath: path,
		name: 'multipartFile',
		header: {
			Authorization: uni.getStorageSync('token')
		},
		formData: {
			index,
			statusId
		},
		success: uploadFileRes => {
			const data = JSON.parse(uploadFileRes.data);
			if (data.code != 200) {
				uni.showToast({
					title: data.msg,
					icon: "error"
				})
			}
		}
	});
}

export const replyReport = (reportId, content) => {
	return myRequest({
		method: 'post',
		url: urlHead + '/replyReport?id=' + reportId + '&content=' + content,
	})
}