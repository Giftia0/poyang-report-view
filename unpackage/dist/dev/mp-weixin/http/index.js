"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://localhost:8080";
const myRequest = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + options.url,
      //接口地址：前缀+方法中传入的地址
      method: options.method || "GET",
      //请求方法：传入的方法或者默认是“GET”
      data: options.data || {},
      //传递参数：传入的参数或者默认传递空集合
      header: {
        Authorization: common_vendor.index.getStorageSync("token")
      },
      success: (res) => {
        const code = res.data.code;
        console.log(code);
        if (code != 200) {
          reject();
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "error"
          });
        }
        if (code == 401) {
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/LoginPage/LoginPage"
            });
          }, 1500);
        }
        if (code == 403) {
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
        resolve(res);
      },
      // 这里的接口请求，如果出现问题就输出接口请求失败
      fail: (err) => {
        console.log("************fail");
        console.log(err);
        reject(err);
      }
    });
  });
};
exports.baseURL = baseURL;
exports.myRequest = myRequest;
