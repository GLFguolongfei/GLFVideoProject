/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var sourceType = $('.sourceType').text();
var ipUrl = $('.ipUrl').text();
var documentTitle = '视频'

var currentIndex = 0; 
var dataArray = [];
var isCircul = false // 是否自动
var isFullScreen = false // 是否全屏

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    // 加载资源
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    $('.info').remove()

    addNames()
    
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)

    // 设置标题
    documentTitle = '视频(' + array.length + ')'
    document.title = documentTitle
});

$(document).keydown(function(event){
    if (event.keyCode == 13) { // enter
        console.log('你按下了Enter'); 
    } else if (event.keyCode == 32) { // backspace
        if (isFullScreen) {
            $('#video').removeClass('videoFull')
        } else {
            $('#video').addClass('videoFull')
        }
        isFullScreen = !isFullScreen
    } else if (event.keyCode == 38) { // arrow up
        preVideo()
    } else if (event.keyCode == 40) { // arrow down
        nextVideo()
    } else {
        // alert(event.keyCode)
    }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
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
    $('.name').html(html);

    let currentEle = document.getElementById('nameSelect')
    currentEle.scrollIntoViewIfNeeded()
}

function playVideo(self) {
    console.log('开始', self.id)
    var model = dataArray[currentIndex];
    var pathArray = model.split('/');
    var name = pathArray[pathArray.length-1];
    var title = name.split('.')[0];
    // 设置标题
    document.title =  (currentIndex + 1) + '/' + dataArray.length + '-' + title;
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
    var videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'views/images/circulSelect.png'
        $('#video').attr('loop', null)
    } else {
        videoCircul.src = 'views/images/circul.png'
        $('#video').attr('loop', '')
    }
}

function preVideo() {
    currentIndex--
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

function nextVideo() {
    currentIndex++
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

function select(index) {
    currentIndex = index
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
    addNames()
}

function switchSrc() {
    let src = $('#iframe').attr('src')
    if (src.indexOf('video') > -1) {
        $('#iframe').attr('src', 'http://127.0.0.1:8090/image?index=0')
    } else {
        $('#iframe').attr('src', 'http://127.0.0.1:8090/video?index=0')
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


