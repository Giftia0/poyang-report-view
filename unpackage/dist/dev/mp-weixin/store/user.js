"use strict";
const common_vendor = require("../common/vendor.js");
const http_api_user = require("../http/api/user.js");
const blankUser = {
  id: "",
  role: "",
  phone: "",
  username: "",
  avatar: "",
  isAuth: 0
};
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    user: blankUser
  }),
  getters: {},
  actions: {
    getUserInfo() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "")
        return;
      http_api_user.getInfo().then((res) => {
        this.user = res.data.data;
      });
    },
    getUser() {
      return this.user;
    },
    exitLogin() {
      this.user = blankUser;
      common_vendor.index.removeStorageSync("token");
    }
  }
});
exports.useUserStore = useUserStore;
