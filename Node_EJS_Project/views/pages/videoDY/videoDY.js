/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
let sourceType = $('.sourceType').text();
let ipUrl = $('.ipUrl').text();

let currentIndex = 0;
// 其它
let isCircul = false // 是否自动
let isFullScreen = false // 是否全屏

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    // 上次播放
    let title = window.localStorage.getItem('title')
    dataArray.map((item, index) => {
        let pathArray = item.split('/');
        let name = pathArray[pathArray.length-1];
        if (name == title) {
            currentIndex = index
        }
    })
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    // 显示界面
    addNames()
    // 设置标题
    document.title = '视频(' + dataArray.length + ')'
});

// 监听键盘事件
$(document).keydown(function(event){
    if (event.keyCode == 32) { // backspace
        // video移除焦点,否则放大的同时会暂停播放
        $('#video').blur();
        if (isFullScreen) {
            $('#video').removeClass('videoFull')
        } else {
            $('#video').addClass('videoFull')
        }
        isFullScreen = !isFullScreen
    } else if (event.keyCode == 37 || event.keyCode == 38) { // arrow up
        preVideo()
    } else if (event.keyCode == 39 || event.keyCode == 40) { // arrow down
        nextVideo()
    }
});

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function addNames() {
    let html = ''
    for (let i = 0; i < dataArray.length; i++) {
        let path = dataArray[i]
        let array = path.split('/')
        if (i == currentIndex) {
            html += '<p id="nameSelect" onclick="select(' + i + ')">【' + (i + 1) + '】' + array[array.length - 1] + '</p>'
        } else {
            html += '<p onclick="select(' + i + ')">【' + (i + 1) + '】' + array[array.length - 1] + '</p>'
        }
    }
    $('#names').html(html);

    let currentEle = document.getElementById('nameSelect')
    currentEle.scrollIntoViewIfNeeded()
}

function playVideo(self) {
    console.log('开始', self.id)
    let model = dataArray[currentIndex];
    let pathArray = model.split('/');
    let name = pathArray[pathArray.length-1];
    let title = name.split('.')[0];
    // 设置标题
    document.title =  (currentIndex + 1) + '/' + dataArray.length + '-' + title;
    // 保存本地
    window.localStorage.setItem('title', name)
}

function endVideo(self) {
    console.log('结束', self.id)
    currentIndex++
    console.log(currentIndex)
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

function videoCircul() {
    isCircul = !isCircul;
    let videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'views/images/circulSelect.png'
        $('#video').attr('loop', null)
    } else {
        videoCircul.src = 'views/images/circul.png'
        $('#video').attr('loop', '')
    }
}

// 上一首
function preVideo() {
    currentIndex--
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

// 下一首
function nextVideo() {
    currentIndex++
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

// 选择播放
function select(index) {
    currentIndex = index
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tools */
// 滚动到当前位置
function scrollToCurrent() {
    let ele = document.getElementById('nameSelect')
    if (ele) {
        ele.scrollIntoViewIfNeeded();
    }
}
