/**
 * 需要先引入jQuery
 */

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
// var urlheader = 'http://101.89.109.52:8089/SportRecover'; // 正式服
var urlheader = 'http://testgy.z-health.cn:8081/SportRecover'; // 测试服

var screenW = $(window).width();
var screenH = $(window).height();

// sessionStorage 存储临时数据
var keymodel1 = "keymodel1";
var keymodel2 = "keymodel2";
var keymodel3 = "keymodel3";

var user_account = window.localStorage.getItem("userAcc");
var user_name = window.localStorage.getItem("userName");
var user_orgId = window.localStorage.getItem("orgId");
var user_orgName = window.localStorage.getItem("orgName");
var systemId = window.localStorage.getItem("systemId");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 监听 */
// 监听键盘事件
$(document).keydown(function(event){
    if (event.keyCode == 13) { // enter
        // 全屏
        if (document.fullscreen) {
            document.cancelFullScreen && document.cancelFullScreen()
            document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        } else {
            document.documentElement.requestFullscreen();
        }
    } else if (event.keyCode == 32) { // backspace

    } else if (event.keyCode == 37 || event.keyCode == 38 ) { // arrow up

    } else if (event.keyCode == 39 || event.keyCode == 40) { // arrow down

    } else {
        // alert(event.keyCode)
        console.log(event.keyCode)
    }
});

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
// 采用正则表达式获取地址栏参数
// alert(GetQueryString("name"));
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

// 获取字符串长度(汉字算两个字符,字母数字算一个)
function getByteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var a = str.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 1;
        } else {
            len += .5;
        }
    }
    return len;
}

// 根据身份证号获取生日/年龄/性别
// type 1-获取出生日期 2-获取性别 3-获取年龄
function getidCardInfo(idcard, type) {
    if (isNull(idcard) == '') {
        return "";
    }
    if (type == 1) { // 获取出生日期
        var birthday = idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
        return birthday;
    }
    if (type == 2) { // 获取性别
        var sex = 0;
        if (idcard.length == 18) {
            sex = parseInt(idcard.substr(16, 1));
        } else {
            sex = parseInt(idcard.substr(14, 1));
        }
        if (sex % 2 == 1) {
            return "男";
        } else {
            return "女";
        }
    }
    if (type == 3) { // 获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - idcard.substring(6, 10) - 1;
        if (idcard.substring(10, 12) < month || idcard.substring(10, 12) == month && idcard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

// 正则表达式验证邮箱格式
function checkEmail(email) {
    if (email != "") {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var isok = reg.test(email);
        if (isok) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// 正则表达式验证手机号格式
function checkPhone(phone) {
    if (phone != "") {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        var isok = reg.test(phone);
        if (isok) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// 正则表达式验证身份证格式
function checkIdCard(idCard) {
    if (idCard != "") {
        var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)?$/i;
        var isok = reg.test(idCard);
        if (isok) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// 判断字符串是否为数字
function isNumber(str) {
    var re = /^[0-9]+.?[0-9]*$/;
    if (!re.test(str)) {
        return false;
    }
    return true;
}

// 判断字符串是否为空
function isNull(str) {
    if (str == undefined || str == 'undefined' || str == null || str == '') {
        return '';
    } else {
        return str;
    }
}

// 验证是否含有特殊字符
// true 通过验证,不含有特殊字符
// false 不通过验证,含有特殊字符
function checkSpecialChar(t) {
    var re = /^[\u4e00-\u9fa5a-z]+$/gi; // 只能输入汉字和英文字母
    if (re.test(t)) {
        return true;
    } else {
        return false;
    }
}

// 判断是否是安卓还是ios
function isiOS() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return isiOS;

    // Vue.js的判断方法
    // var inBrowser = typeof window !== 'undefined';
    // var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    // var isIE = UA && /msie|trident/.test(UA);
    // var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    // var isEdge = UA && UA.indexOf('edge/') > 0;
    // var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
    // var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
    // var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
}

// 返回
function backvc() {
    window.history.back();
    // window.history.go(-1);
    // window.location.reload();
    // window.location.href = document.referrer; // 返回上一页并刷新
}

// 是否登录
// isLogin 如果没登录是否进入登录页面
function isLogin(isLogin) {
    var userId = window.sessionStorage.userId;
    if (userId == "" || userId == null) {
        window.localStorage.setItem("userAcc", "");
        window.localStorage.setItem("password", "");
        if (isLogin) {
            window.location.href = "../login/login.html";
        }
        return false;
    }
    return true;
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 时间格式转换 */
Date.prototype.Format = function (fmt) {
    var o = {
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "M+": this.getMonth() + 1,  // 月
        "d+": this.getDate(),       // 日
        "h+": this.getHours(),      // 小时
        "m+": this.getMinutes(),    // 分
        "s+": this.getSeconds(),    // 秒
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

Date.prototype.FormatMonth = function (fmt, addMonths) {
    var o = {
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季
        "M+": this.getMonth() + 1 + addMonths,  // 月
        "d+": this.getDate(),       // 日
        "h+": this.getHours(),      // 小时
        "m+": this.getMinutes(),    // 分
        "s+": this.getSeconds(),    // 秒
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

Date.prototype.FormatDay = function (fmt, addDays) {
    var o = {
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季
        "M+": this.getMonth() + 1,  // 月
        "d+": this.getDate() + addDays, // 日
        "h+": this.getHours(),      // 小时
        "m+": this.getMinutes(),    // 分
        "s+": this.getSeconds(),    // 秒
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// 格式化日期
// 结果格式 2018-04-25
function dateformat(d) {
    d = d.toString();
    var re = new RegExp("-", "g");
    var date = new Date(d.replace(re, "/"));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    formatdate = year + "\-" + month + "\-" + day;
    return formatdate;
}

// 获取多少天后的日期
function getdate(d, index) {
    var date1 = new Date(d);
    var date = new Date(date1.getTime() - index * 24 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    formatdate = year + "\-" + month + "\-" + day;
    return formatdate;
}

// 获取当前时间
function getdqdate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }

    var s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }

    formatdate = year + "\-" + month + "\-" + day + " " + hours + ":" + m + ":" + s;
    return formatdate;
}

// 获取多少天后的日期
function getdsthdate(d, index) {
    var date1 = new Date(d);
    var date = new Date(date1.getTime() - index * 24 * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    formatdate = year + "\-" + month + "\-" + day;
    return formatdate;
}

// 获取多少小时前的日期
function gettime(d, index) {
    var date1 = new Date(d);
    var date = new Date(date1.getTime() - index * 3600 * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }

    var s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }

    formatdate = year + "\-" + month + "\-" + day + " " + hours + ":" + m;
    return formatdate;
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ jQuery */
// work with jQuery Compact 3.x
jQuery.prototype.serializeObject = function () {
    var a, o, h, i, e;
    a = this.serializeArray();
    o = {};
    h = o.hasOwnProperty;
    for (i = 0; i < a.length; i++) {
        e = a[i];
        if (!h.call(o, e.name)) {
            o[e.name] = e.value;
        }
    }
    return o;
};


