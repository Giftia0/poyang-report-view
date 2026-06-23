import { myRequest, baseURL } from '../index.js'

const urlHead = '/user'

export const getInfo = () => {
	return myRequest({
		url: urlHead + '/getUserInfo'
	})
}


// export const uploadIdcard = (path, side) => {
// 	return new Promise((resolve) => {
// 		const uploadTask = uni.uploadFile({
// 			url: baseURL + urlHead + '/uploadIdcard',
// 			filePath: path,
// 			name: 'multipartFile',
// 			header: {
// 				Authorization: uni.getStorageSync('token')
// 			},
// 			formData: {
// 				'side': side
// 			},
// 			success: uploadFileRes => {
// 				const data = JSON.parse(uploadFileRes.data);
// 				if (data.code != 200) {
// 					uni.showToast({
// 						title: data.msg,
// 						icon: "error"
// 					})
// 				}
// 				const record = data.data;
// 				resolve({record,uploadTask});
// 			}
// 		});
// 	})
// }


export const clearAuthRecord = () => {
	return myRequest({
		url: urlHead + '/clearAuthRecord',
	})
}

export const checkAuthRecord = () => {
	return myRequest({
		url: urlHead + '/checkAuthRecord',
	})
}

export const getAuthInfo = () => {
	return myRequest({
		url: urlHead + '/getAuthInfo',
	})
}

