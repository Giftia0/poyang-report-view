"use strict";
const http_index = require("../index.js");
const urlHead = "/visitor";
const getCode = (phone) => {
  return http_index.myRequest({
    url: urlHead + "/getCheckCode/" + phone
  });
};
const loginByCode = (phone, code) => {
  return http_index.myRequest({
    method: "post",
    url: urlHead + "/loginByCheckCode",
    data: {
      phone,
      code
    }
  });
};
exports.getCode = getCode;
exports.loginByCode = loginByCode;
