/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var videos = [
    "百战成诗.mp4",
    "不谓侠.mp4",
    "冲动的惩罚.mp4",
    "此生过半1.mp4",
    "此生过半2.mp4",
    "广寒宫1.mp4",
    "广寒宫2.mp4",
    "归去来.mp4",
    "来自天堂的魔鬼.mp4",
    "让泪化作相思雨.mp4",
    "踏山河.mp4",
    "忘川彼岸.mp4",
    "闲庭絮1.mp4",
    "闲庭絮2.mp4",
    "一生回味一面.mp4",
    "雨点失了身.mp4",
    "醉倾城.mp4",
    "刚好遇见你.mp4",
    "童话镇.mp4",
];
var currentEle = "";
var isCircul = false;

var html = '';
for (var i = 0; i < videos.length; i++) {
    html += '<video class="item" id="' + i + '" src="sources/' + videos[i] + '" controls loop onplay="playVideo(this)" onended="endVideo(this)"></video>';
}
$(".container").append(html);

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function playVideo(self) {
    currentEle = self;
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        if (video == self) {
            video.play();
            video.classList.add("itemCurrent")
            videoCurrent();
            var model = videos[i];
            var title = model.split('.')[0];
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
        if (parseInt(self.id) + 1 < videos.length) {
            idStr = parseInt(self.id) + 1 + ''  
        } 
        console.log(idStr)
        let video = document.getElementById(idStr)
        playVideo(video)
    }
}

function videoCurrent() {
    if (currentEle) {
        currentEle.scrollIntoViewIfNeeded();
    } else {
        alert("当前没有正在播放的视频");
    }
}

function videoCircul() {
    isCircul = !isCircul;
    var videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'images/circulSelect.png'
    } else {
        videoCircul.src = 'images/circul.png'
    }
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        video.loop = !isCircul
    }
}



