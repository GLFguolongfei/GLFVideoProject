

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var currentIndex = 0; 
var pageSize = 30;
var dataArray = [];
var itemHeight = '65vh'
var currentEle = "";
var timer; // 圣诞雪花计时器

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
function addMore() {
    $(".addMore").remove();
    // 这种算法是没有问题的,再好好回想下,不要动
    currentIndex += pageSize;
    var html = '';
    if (dataArray.length < currentIndex) {
        for (var i = currentIndex-pageSize; i < dataArray.length; i++) {
            html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
        } 
    } else {
        for (var i = currentIndex-pageSize; i < currentIndex; i++) {
            html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
        } 
        html += '<button class="addMore" onclick="addMore()">点击加载更多......</button>';
        $(".addMore").show();
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

function imgPlay() {
    window.location.href = 'http://127.0.0.1:8080/imagePlay'
}
