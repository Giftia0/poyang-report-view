"use strict";
function formatDate(dateString) {
  const now = /* @__PURE__ */ new Date();
  const inputDate = new Date(dateString);
  const diffMs = now - inputDate;
  if (isNaN(diffMs)) {
    return "无效的日期格式";
  }
  const isSameDay = now.getFullYear() === inputDate.getFullYear() && now.getMonth() === inputDate.getMonth() && now.getDate() === inputDate.getDate();
  const isSameYear = now.getFullYear() === inputDate.getFullYear();
  const diffMins = Math.round(diffMs / (1e3 * 60));
  const diffHours = Math.round(diffMins / 60);
  if (diffMs < 60 * 1e3) {
    return "刚刚";
  } else if (diffMs < 59 * 60 * 1e3) {
    return `${diffMins}分钟前`;
  } else if (isSameDay) {
    return `${diffHours}小时前`;
  } else if (isSameYear) {
    return `${inputDate.getMonth() + 1 < 10 ? "0" + (inputDate.getMonth() + 1) : inputDate.getMonth() + 1}-${inputDate.getDate() < 10 ? "0" + inputDate.getDate() : inputDate.getDate()}`;
  } else {
    return inputDate.toISOString().slice(0, 10);
  }
}
exports.formatDate = formatDate;
