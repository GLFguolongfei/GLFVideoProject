/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var sourceType = $('.sourceType').text();
var ipUrl = $('.ipUrl').text();
var documentTitle = '图片'

var initIndex = 0;
var currentIndex = 0; 
var pageSize = 30;
var dataArray = [];
var currentEle = "";
var timer; // 圣诞雪花计时器
var itemHeight = '60vh'

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    $('.modal').hide()
    currentIndex = getQueryString('index') || 0
    currentIndex = parseInt(currentIndex)
    initIndex = parseInt(currentIndex)
    // 加载资源
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    if (currentIndex > array.length - 1) {
        alert('下标已超出视频资源数量, 默认从0开始')
        currentIndex = 0
        initIndex = 0
    }
    addMore();
    // 设置标题
    documentTitle = '图片(' + array.length + ')'
    document.title = documentTitle
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function addMore(type = 1) {
    if (type == 2 && dataArray.length - currentIndex > 500) {
        alert('图片太多，不建议一次性加载全部')
        return
    }
    if (currentIndex - initIndex > 500) {
        var url = window.location.origin + window.location.pathname + '?index=' + currentIndex
        // window.location.replace(url)
        window.location.href = url
        return
    }
    $(".addMore").remove();
    var html = '';
    if (type == 1) {
        currentIndex += pageSize;
        if (dataArray.length < currentIndex) {
            for (var i = currentIndex-pageSize; i < dataArray.length; i++) {
                html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
            } 
        } else {
            for (var i = currentIndex-pageSize; i < currentIndex; i++) {
                html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
            } 
            html += '<div class="addMore">'         
            html += '<button onclick="addMore(1)">点击加载更多......</button>';
            html += '<button onclick="addMore(2)">点击加载全部......</button>';
            html += '</div>' 
        }
    } else {
        for (var i = currentIndex; i < dataArray.length; i++) {
            html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
        } 
        currentIndex = dataArray.length - 1
    }
    $(".container").append(html);
}

function playAudio() {
    timer = snowFlow({
        num: $(window).width() / 35,
        text: "❄"
    });
    $(".snow").show()

    var html = '';
    for (var i = 0; i < dataArray.length; i++) {
        html += '<img class="item marqueeItem" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
    } 
    $(".marquee").append(html);
}

function pauseAudio() {
    clearInterval(timer)
    $(".snow").hide()
    $(".marqueeItem").remove();
}
  
function itemClick(self) {
    $('#showImg').attr('src', self.src)
    if (currentEle == self) {
        $('.modal').hide()
    } else {
        $('.modal').show()
    }
}

function handleModal() {
    $('.modal').hide()
}

function imgBig() {
    var array = document.getElementsByClassName("item");
    for (var i = 0; i < array.length; i++) {
        var img = array[i];
        let heightStr = img.style.height || '65vh'
        let height = parseInt(heightStr.substr(0, 2)) 
        if (height + 10 < 100) {
            itemHeight = height + 10 + 'vh'
            img.style.height = itemHeight
        } 
    }
}

function imgSmall() {
    var array = document.getElementsByClassName("item");
    for (var i = 0; i < array.length; i++) {
        var img = array[i];
        let heightStr = img.style.height || '65vh'
        let height = parseInt(heightStr.substr(0, 2)) 
        if (height - 10 > 10) {
            itemHeight = height - 10 + 'vh'
            img.style.height = itemHeight
        }
    }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 工具 */
// 采用正则表达式获取地址栏参数
// alert(getQueryString("password"));
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}


