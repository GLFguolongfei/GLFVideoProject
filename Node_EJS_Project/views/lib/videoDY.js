/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var sourceType = $('.sourceType').text();
var ipUrl = $('.ipUrl').text();
var documentTitle = '视频'

var currentIndex = 0; 
var dataArray = [];
var isCircul = false;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    currentIndex = getQueryString('index') || 0
    currentIndex = parseInt(currentIndex)

    // 加载资源
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)

    // 设置标题
    documentTitle = '视频(' + array.length + ')'
    document.title = documentTitle
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
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
}

function nextVideo() {
    currentIndex++
    let videoSrc = dataArray[currentIndex]
    $('#video').attr('src', videoSrc)
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 工具 */
// 采用正则表达式获取地址栏参数
// alert(getQueryString("password"));
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}


