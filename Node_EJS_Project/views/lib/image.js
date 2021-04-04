/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var currentIndex = 0; 
var pageSize = 30;
var dataArray = [];
var currentEle = "";
var timer; // 圣诞雪花计时器
var itemHeight = '60vh'

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    $('.modal').hide()
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = "http://127.0.0.1:8080" + ele.textContent;
        dataArray.push(src);
    }
    addMore();
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function addMore(type = 1) {
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
