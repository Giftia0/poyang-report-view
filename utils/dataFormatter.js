import moment from 'moment'
function formatDate(dateString) {  
    const now = new Date();  
    const inputDate = new Date(dateString);  
    const diffMs = now - inputDate;  
  
    if (isNaN(diffMs)) {  
        // 无效日期格式  
        return '无效的日期格式';  
    }  
  
    // 判断当前日期是否相同  
    const isSameDay = (  
        now.getFullYear() === inputDate.getFullYear() &&  
        now.getMonth() === inputDate.getMonth() &&  
        now.getDate() === inputDate.getDate()  
    );  
  
    // 判断当前年份是否相同  
    const isSameYear = now.getFullYear() === inputDate.getFullYear();  
  
    // 计算分钟数  
    const diffMins = Math.round(diffMs / (1000 * 60));  
  
    // 计算小时数  
    const diffHours = Math.round(diffMins / 60);  
  
    // 根据时间差进行格式化  
    if (diffMs < 60 * 1000) {  
        // 一分钟内  
        return '刚刚';  
    } else if (diffMs < 59 * 60 * 1000) {  
        // 一个小时内  
        return `${diffMins}分钟前`;  
    } else if (isSameDay) {  
        // 当天  
        return `${diffHours}小时前`;  
    } else if (isSameYear) {  
        // 同年  
        return `${inputDate.getMonth() + 1 < 10 ? '0' + (inputDate.getMonth() + 1) : inputDate.getMonth() + 1}-${inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate()}`;  
    } else {  
        // 其余时间  
        return moment(inputDate).format('YYYY-MM-DD') ;  
    }  
}

export default formatDate