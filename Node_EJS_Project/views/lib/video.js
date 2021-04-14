/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var sourceType = $('.sourceType').text();
var ipUrl = $('.ipUrl').text();
var documentTitle = '视频'

var lastIndex = 0; 
var pageSize = 15;
var currentEle = "";
var dataArray = [];
var isCircul = false;
var itemHeight = '60vh'


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    lastIndex = getQueryString('index') || 0
    lastIndex = parseInt(lastIndex)
    // 加载资源
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = ipUrl + ele.textContent;
        dataArray.push(src);
    }
    if (lastIndex > array.length - 1) {
        alert('下标已超出视频资源数量')
        return
    }
    addMore();
    // 设置标题
    let str = ''
    switch (+sourceType) {
        case 1:
            str = '本地'
            break;
        case 2:
            str = 'iCloud'
            break;
        default:
    }
    documentTitle = str + '视频(' + array.length + ')'
    document.title = documentTitle
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function addMore(type = 1) {
    if (type == 2 && dataArray.length - lastIndex > 200) {
        alert('视频太多，不建议一次性加载全部')
        return
    }
    $(".addMore").remove();
    var html = '';
    if (type == 1) {
        lastIndex += pageSize;
        for (var i = lastIndex - pageSize; i < lastIndex; i++) {
            if (i >= dataArray.length - 1) {
                break;
            } else if (i == lastIndex - 1 && i < dataArray.length) {
                html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';   
                html += '<div class="addMore">'         
                html += '<button onclick="addMore(1)">点击加载更多......</button>';
                html += '<button onclick="addMore(2)">点击加载全部......</button>';
                html += '</div>'         
            } else {
                html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';            
            }
        } 
    } else {
        for (var i = lastIndex; i < dataArray.length; i++) {
            html += '<video class="item" id="' + i + '" style="height:' + itemHeight + '" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';            
        } 
        lastIndex = dataArray.length - 1
    }
    $(".container").append(html);
}

function playVideo(self) {
    currentEle = self;
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        if (video == self) {
            video.play();
            video.classList.add("itemCurrent")
            videoCurrent(true);
            var model = dataArray[i];
            var pathArray = model.split('/');
            var name = pathArray[pathArray.length-1];
            var title = name.split('.')[0];
            // 设置标题
            document.title = documentTitle + '-' + (i + 1) + '-' + title;
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
        if (parseInt(self.id) < lastIndex) {
            idStr = parseInt(self.id) + 1 + ''  
        } 
        console.log(idStr)
        let video = document.getElementById(idStr)
        playVideo(video)
    }
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

function videoCurrent() {
    if (currentEle) {
        var hhhh = $(".container").scrollTop() + $(currentEle).offset().top - $(".container").offset().top;
        hhhh -= 20;
        $(".container").animate({ scrollTop:  hhhh}, 300); 
    } else {
        alert("当前没有正在播放的视频");
    }
}

function videoCircul() {
    isCircul = !isCircul;
    var videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'views/images/circulSelect.png'
    } else {
        videoCircul.src = 'views/images/circul.png'
    }
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        video.loop = !isCircul
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


