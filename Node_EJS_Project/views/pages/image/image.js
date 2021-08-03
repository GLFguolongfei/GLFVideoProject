/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
let sourceType = $('.sourceType').text();
let ipUrl = $('.ipUrl').text();

let initIndex = 0;
let currentIndex = 0;
// 数据源
let dataArray = [];
let pageSize = 30;
// 圣诞雪花计时器
let timer;
// 其它
let itemHeight = '60vh'
let modalIndex = 0;

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    $('#modal').hide()
    let index = getQueryString('index') || 0
    initIndex = parseInt(index)
    currentIndex = parseInt(index)
    // 加载资源
    getSourceData()
    // 显示界面
    if (currentIndex > dataArray.length - 1) {
        alert('下标已超出视频资源数量, 默认从0开始加载')
        initIndex = 0
        currentIndex = 0
    }
    addMore();
    // 设置标题
    document.title = '图片(' + dataArray.length + ')'
});

// 监听键盘事件
$(document).keydown(function(event){
    if (event.keyCode == 13) { // enter

    } else if (event.keyCode == 32) { // backspace
        this.handleModal()
    } else if (event.keyCode == 37 || event.keyCode == 38 ) { // arrow up
        preImg()
    } else if (event.keyCode == 39 || event.keyCode == 40) { // arrow down
        nextImg()
    } else {
        // alert(event.keyCode)
    }
});

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
// type 1加载下一页 2加载全部
function addMore(type = 1) {
    if (type == 2 && dataArray.length - currentIndex > 200) {
        alert('图片太多, 不建议一次性加载全部')
        addMore()
        return
    }
    if (currentIndex - initIndex > 500) {
        let url = window.location.origin + window.location.pathname + '?index=' + currentIndex
        window.location.href = url
        return
    }
    $(".addMore").remove();
    let html = '';
    if (type == 1) {
        currentIndex += pageSize;
        if (dataArray.length < currentIndex) {
            for (let i = currentIndex-pageSize; i < dataArray.length; i++) {
                html += '<img class="item" style="height:' + itemHeight
                    + '" src="' + dataArray[i]
                    + '" onclick="itemClick(this, ' + i + ')" />';
            }
        } else {
            for (let i = currentIndex-pageSize; i < currentIndex; i++) {
                html += '<img class="item" style="height:' + itemHeight
                    + '" src="' + dataArray[i]
                    + '" onclick="itemClick(this, ' + i + ')" />';
            }
            html += '<div class="addMore">'
            html += '<button onclick="addMore(1)">加载更多...</button>';
            html += '<button onclick="addMore(2)">加载全部...</button>';
            html += '</div>'
        }
    } else {
        for (let i = currentIndex; i < dataArray.length; i++) {
            html += '<img class="item" style="height:' + itemHeight
                + '" src="' + dataArray[i]
                + '" onclick="itemClick(this, ' + i + ')" />';
        }
        currentIndex = dataArray.length - 1
    }
    $("#container").append(html);
}

function playAudio() {
    timer = snowFlow({
        num: screenW / 35,
        text: "❄"
    });
    $(".snow").show()
}

function pauseAudio() {
    clearInterval(timer)
    $(".snow").hide()
}

function itemClick(self, index) {
    modalIndex = index
    $('#showImg').attr('src', self.src)
    $('#modal').show()
}

function handleModal() {
    $('#modal').hide()
}

function imgBig() {
    let array = document.getElementsByClassName("item");
    for (let i = 0; i < array.length; i++) {
        let img = array[i];
        let heightStr = img.style.height || '65vh'
        let height = parseInt(heightStr.substr(0, 2))
        if (height + 10 < 100) {
            itemHeight = height + 10 + 'vh'
            img.style.height = itemHeight
        }
    }
}

function imgSmall() {
    let array = document.getElementsByClassName("item");
    for (let i = 0; i < array.length; i++) {
        let img = array[i];
        let heightStr = img.style.height || '65vh'
        let height = parseInt(heightStr.substr(0, 2))
        if (height - 10 > 10) {
            itemHeight = height - 10 + 'vh'
            img.style.height = itemHeight
        }
    }
}

// 上一张
function preImg(event) {
    event && event.stopPropagation()
    modalIndex--
    if (modalIndex < 0) {
        modalIndex = dataArray.length - 1
    }
    let src = dataArray[modalIndex]
    $('#showImg').attr('src', src)
}

// 下一张
function nextImg(event) {
    event && event.stopPropagation()
    modalIndex++
    if (modalIndex >= dataArray.length) {
        modalIndex = 0
    }
    let src = dataArray[modalIndex]
    $('#showImg').attr('src', src)
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tools */
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

