

var currentIndex = 0; 
var pageSize = 15;
var currentEle = "";
var dataArray = [];

$(function () {
    var array = document.getElementsByClassName("source");
    for (var i = 0; i < array.length; i++) {
        var ele = array[i];
        var src = "http://127.0.0.1:8080" + ele.textContent;
        dataArray.push(src);
    }
    addMore();
});

function addMore() {
    $(".addMore").remove();
    // 这种算法是没有问题的,再好好回想下,不要动
    currentIndex += pageSize;
    var html = '';
    if (dataArray.length < currentIndex) {
        for (var i = currentIndex-pageSize; i < dataArray.length; i++) {
            html += '<video class="item" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)"></video>';
        } 
    } else {
        for (var i = currentIndex-pageSize; i < currentIndex; i++) {
            html += '<video class="item" src="' + dataArray[i] + '" controls loop onplay="playVideo(this)"></video>';
        } 
        html += '<button class="addMore" onclick="addMore()">点击加载更多......</button>';
        $(".addMore").show();
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
            current(true);
            var model = dataArray[i];
            var pathArray = model.split('/');
            var name = pathArray[pathArray.length-1];
            var title = name.split('.')[0];
            document.title = title;
        } else {
            video.pause();
        }
    }
}

function current(isFast) {
    var time = 600;
    if (isFast) {
        time = 300;
    }
    if (currentEle) {
        var hhhh = $(".container").scrollTop() + $(currentEle).offset().top - $(".container").offset().top;
        hhhh -= 60;
        $(".container").animate({ scrollTop:  hhhh}, time); 
    } else {
        alert("当前没有正在播放的视频");
    }
}



