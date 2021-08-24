/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
let initIndex = 0;
let currentIndex = 0;
// 分页加载
let pageSize = 15;
// 其它
let itemHeight = '60vh'
let isCircul = false;
let interval

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    let index = getQueryString('index') || 0
    currentIndex = parseInt(index)
    initIndex = parseInt(index)
    // 显示界面
    if (currentIndex > dataArray.length - 1) {
        alert('下标已超出视频资源数量, 默认从0开始')
        initIndex = 0
        currentIndex = 0
    }
    addMore();
    // 设置标题
    document.title = '视频(' + dataArray.length + ')'
});

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function addMore(type = 1) {
    if (type == 2 && dataArray.length - currentIndex > 150) {
        antd.message.warning('最多一次加载150条')
        addMore()
        interval = setInterval(function () {
            if (currentIndex - initIndex >= 150) {
                clearInterval(interval);
                interval = null
                return
            }
            addMore()
        }, 1000)
        return
    }
    if (currentIndex - initIndex >= 150) {
        let url = window.location.origin + window.location.pathname + '?index=' + currentIndex
        window.location.href = url
        return
    }
    $(".addMore").remove();
    let html = '';
    if (type == 1) {
        currentIndex += pageSize;
        for (let i = currentIndex - pageSize; i < currentIndex; i++) {
            if (i >= dataArray.length - 1) {
                break;
            } else if (i == currentIndex - 1 && i < dataArray.length) {
                html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';
                html += '<div class="addMore">'
                html += '<button onclick="addMore(1)">加载更多...</button>';
                html += '<button onclick="addMore(2)">加载全部...</button>';
                html += '</div>'
            } else {
                html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';
            }
        }
    } else {
        for (let i = currentIndex; i < dataArray.length; i++) {
            html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';
        }
        currentIndex = dataArray.length - 1
    }
    $("#container").append(html);
}

function playVideo(self) {
    let array = document.getElementsByTagName("video");
    for (let i = 0; i < array.length; i++) {
        let video = array[i];
        if (video == self) {
            video.play();
            video.classList.add("itemCurrent")
            scrollToCurrent();

            // 设置标题
            let model = dataArray[i];
            let pathArray = model.split('/');
            let name = pathArray[pathArray.length-1];
            let title = name.split('.')[0];
            document.title = (currentIndex + 1) + '/' + dataArray.length + '-' + title;
        } else {
            video.pause();
            video.classList.remove("itemCurrent")
        }
    }
}

function endVideo(self) {
    console.log(self.id)
    if (isCircul) {
        let idStr = '0'
        if (parseInt(self.id) < currentIndex) {
            idStr = parseInt(self.id) + 1 + ''
        }
        console.log(idStr)
        let video = document.getElementById(idStr)
        playVideo(video)
    }
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

function videoCircul() {
    isCircul = !isCircul;
    let videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'views/images/circulSelect.png'
    } else {
        videoCircul.src = 'views/images/circul.png'
    }
    let array = document.getElementsByTagName("video");
    for (let i = 0; i < array.length; i++) {
        let video = array[i];
        video.loop = !isCircul
    }
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tools */
// 滚动到当前位置
function scrollToCurrent() {
    let array = document.getElementsByClassName('itemCurrent') || []
    if (array.length > 0) {
        let ele = array[0]
        ele.scrollIntoViewIfNeeded();
    }
}