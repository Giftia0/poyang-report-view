"use strict";
const http_index = require("../index.js");
const urlHead = "/user";
const getInfo = () => {
  return http_index.myRequest({
    url: urlHead + "/getUserInfo"
  });
};
const clearAuthRecord = () => {
  return http_index.myRequest({
    url: urlHead + "/clearAuthRecord"
  });
};
const checkAuthRecord = () => {
  return http_index.myRequest({
    url: urlHead + "/checkAuthRecord"
  });
};
const getAuthInfo = () => {
  return http_index.myRequest({
    url: urlHead + "/getAuthInfo"
  });
};
exports.checkAuthRecord = checkAuthRecord;
exports.clearAuthRecord = clearAuthRecord;
exports.getAuthInfo = getAuthInfo;
exports.getInfo = getInfo;
