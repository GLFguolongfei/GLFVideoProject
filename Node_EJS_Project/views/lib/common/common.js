/**
 * 需要先引入jQuery
 */

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
const screenW = $(window).width();
const screenH = $(window).height();

// 数据源
const sourceType = $('.sourceType').text();
const rootPath = $('.rootPath').text();
const ipUrl = $('.ipUrl').text();
let dataArray = [];

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Ready')

    // 加载资源
    getSourceData()
});

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

// 加载资源
function getSourceData() {
    let array = document.getElementsByClassName("source");
    for (let i = 0; i < array.length; i++) {
        let ele = array[i];
        let src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    $('#data').remove()
}


