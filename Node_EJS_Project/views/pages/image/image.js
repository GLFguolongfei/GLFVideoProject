/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
let sourceType = $('.sourceType').text();
let ipUrl = $('.ipUrl').text();
let documentTitle = '图片'

let initIndex = 0;
let currentIndex = 0;
let pageSize = 30;
let dataArray = [];
let currentEle = "";
let timer; // 圣诞雪花计时器
let itemHeight = '60vh'

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    $('.modal').hide()
    currentIndex = getQueryString('index') || 0
    currentIndex = parseInt(currentIndex)
    initIndex = parseInt(currentIndex)
    // 加载资源
    let array = document.getElementsByClassName("source");
    for (let i = 0; i < array.length; i++) {
        let ele = array[i];
        let src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    $('.info').remove()
    if (currentIndex > dataArray.length - 1) {
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
    if (type == 2 && dataArray.length - currentIndex > 200) {
        addMore()
        setTimeout(function() {
            alert('图片太多，不建议一次性加载全部')
        }, 1000)
        return
    }
    if (currentIndex - initIndex > 500) {
        let url = window.location.origin + window.location.pathname + '?index=' + currentIndex
        // window.location.replace(url)
        window.location.href = url
        return
    }
    $(".addMore").remove();
    let html = '';
    if (type == 1) {
        currentIndex += pageSize;
        if (dataArray.length < currentIndex) {
            for (let i = currentIndex-pageSize; i < dataArray.length; i++) {
                html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
            }
        } else {
            for (let i = currentIndex-pageSize; i < currentIndex; i++) {
                html += '<img class="item" style="height:' + itemHeight + '" src="' + dataArray[i] + '" onclick="itemClick(this)" />';
            }
            html += '<div class="addMore">'
            html += '<button onclick="addMore(1)">点击加载更多......</button>';
            html += '<button onclick="addMore(2)">点击加载全部......</button>';
            html += '</div>'
        }
    } else {
        for (let i = currentIndex; i < dataArray.length; i++) {
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

    let html = '';
    for (let i = 0; i < dataArray.length; i++) {
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



