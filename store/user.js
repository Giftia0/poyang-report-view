import { defineStore } from 'pinia'
import { getInfo } from '../http/api/user.js'
import { reactive } from 'vue';
// import jwtDecode from 'jwt-decode'

const blankUser = {
	id: '',
	role: '',
	phone: '',
	username: '',
	avatar: '',
	isAuth: 0
}

export const useUserStore = defineStore('user', {
	state: () => ({
		user: blankUser
	}),
	getters: {},
	actions: {
		getUserInfo() {
			const token = uni.getStorageSync('token');
			if (token == '') return;
			getInfo().then((res) => {
				this.user = res.data.data
			})
		},
		getUser() {
			return this.user;
		},
		exitLogin() {
			this.user = blankUser;
			uni.removeStorageSync('token');
		}
	}
})