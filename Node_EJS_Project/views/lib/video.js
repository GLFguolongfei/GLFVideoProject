

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var lastIndex = 0; 
var pageSize = 15;
var currentEle = "";
var dataArray = [];
var isCircul = false;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
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
    lastIndex += pageSize;
    var html = '';
    for (var i = lastIndex - pageSize; i < lastIndex; i++) {
        if (i >= dataArray.length - 1) {
            break;
        } else if (i == lastIndex - 1 && i < dataArray.length) {
            html += '<video class="item" id="' + i + '" src="' + dataArray[i] + '" controls loop controlslist="nodownload" onplay="playVideo(this)" onended="endVideo(this)"></video>';            
            html += '<button class="addMore" onclick="addMore()">点击加载更多......</button>';
        } else {
            html += '<video class="item" id="' + i + '" src="' + dataArray[i] + '" controls loop controlslist="nodownload" onplay="playVideo(this)" onended="endVideo(this)"></video>';            
        }
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
            document.title = title;
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
        if (parseInt(self.id) + 1 < lastIndex) {
            idStr = parseInt(self.id) + 1 + ''  
        } 
        console.log(idStr)
        let video = document.getElementById(idStr)
        playVideo(video)
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

