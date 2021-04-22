function snowFlow(snow) {
    var screenW = $(window).width(),
        screenH = $(window).height(),
        snowBox = $("<div class='snow-box' style='position: fixed;top: 0;color: #fff;'>"),
        snowBoxHtml = "",
        snowCss = "",
        snowAttr = {
            "opacity": [],
            "fontSize": [],
            "x": [],
            "y": []
        },
        offsetX = 0,
        offsetY = 0;

    for (var i = 0; i < parseInt(snow.num || 18); i += 1) {
        snowCss = "";
        snowAttr["opacity"][i] = 0.5 + 0.5 * Math.random();
        snowAttr["fontSize"][i] = 20 + 20 * Math.random();
        snowAttr["x"][i] = parseInt(screenW * Math.random());
        snowAttr["y"][i] = -i * 80;
        snowCss = "position:absolute;top:0;";
        snowCss += "opacity:" + snowAttr["opacity"][i] + ";";
        snowCss += "font-size:" + snowAttr["fontSize"][i] + "px;";
        snowCss += "-webkit-transform:" + "translate3d(" + snowAttr["x"][i] + "px," + snowAttr["y"][i] + "px, 0)" + ";";
        snowCss += "transform:" + "translate3d(" + snowAttr["x"][i] + "px," + snowAttr["y"][i] + "px, 0)" + ";";
        snowBoxHtml += "<b class='snow' style='" + snowCss + "'>" + snow.text + "</b>";
    }

    snowBox.html(snowBoxHtml);

    snowBox.appendTo($("body"));

    var snow = $(".snow");

    timer = setInterval(function () {
        $.each(snow, function (index, item) {
            if (snowAttr["y"][index] > screenH || snowAttr["x"][index] < -50 || snowAttr["x"][index] > screenW + 50) {
                snowAttr["y"][index] = -100;
                snowAttr["x"][index] = parseInt(screenW * Math.random());
            }
            offsetX = index % 2 ? -0.2 : 0.2;
            offsetY = index % 2 ? 0.7 : 0.9;
            snowAttr["x"][index] += offsetX;
            snowAttr["y"][index] += offsetY;
            $(item).css({
                "-webkit-transform": "translate3d(" + snowAttr["x"][index] + "px," + snowAttr["y"][index] + "px, 0)",
                "transform": "translate3d(" + snowAttr["x"][index] + "px," + snowAttr["y"][index] + "px, 0)"
            })
        })
    }, 1000 / 60);

    return timer;
}

