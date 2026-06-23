import {
	myRequest
} from '../index.js'

const urlHead = '/visitor'


export const getCode = (phone) => {
	return myRequest({
		url: urlHead + '/getCheckCode/' + phone
	})
}

export const loginByCode = (phone, code) => {
	return myRequest({
		method: 'post',
		url: urlHead + '/loginByCheckCode',
		data: {
			phone,
			code
		},
	})
}