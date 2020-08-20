

var currentIndex = 0; 
var pageSize = 15;
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
            html += '<img class="item" src="' + dataArray[i] + '" />';
        } 
    } else {
        for (var i = currentIndex-pageSize; i < currentIndex; i++) {
            html += '<img class="item" src="' + dataArray[i] + '"/>';
        } 
        html += '<button class="addMore" onclick="addMore()">点击加载更多......</button>';
        $(".addMore").show();
    }
    $(".container").append(html);
}
  
