"use strict";
const common_vendor = require("../../common/vendor.js");
const http_index = require("../index.js");
const urlHead = "/report";
const addReport = (report) => {
  let copy = { ...report };
  delete copy.img;
  return http_index.myRequest({
    method: "post",
    url: urlHead + "/addReport",
    data: copy
  });
};
const addReportImg = (path, index, reportId) => {
  common_vendor.index.uploadFile({
    url: http_index.baseURL + urlHead + "/addReportImg",
    filePath: path,
    name: "multipartFile",
    header: {
      Authorization: common_vendor.index.getStorageSync("token")
    },
    formData: {
      index,
      reportId
    },
    success: (uploadFileRes) => {
      const data = JSON.parse(uploadFileRes.data);
      if (data.code != 200) {
        common_vendor.index.showToast({
          title: data.msg,
          icon: "error"
        });
      }
    }
  });
};
const getMyReport = () => {
  return http_index.myRequest({
    url: urlHead + "/getMyReport"
  });
};
exports.addReport = addReport;
exports.addReportImg = addReportImg;
exports.getMyReport = getMyReport;
