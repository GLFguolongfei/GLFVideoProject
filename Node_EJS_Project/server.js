/** Official */
var fs = require("fs")
var http = require('http');
var url = require('url');
var path = require("path")
/** Vendor */
var urlencode = require('urlencode');
var ejs = require('ejs');
var axios = require("axios")
/** Custom */
var mimeModul = require('./getmime.js');
var {sourceType, rootPath, ipUrl} = require('./project.config.js')

var imageArray = []
var videoArray = []
var robotArray = []

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 遍历数据 */
// 使用异步获取路径
// 参数是遍历文件的根路径
function readDirSync(filePath) {
    // fs.readdirSync(path[, options])
    // 读取目录的内容
    var pa = fs.readdirSync(filePath);
    pa.forEach(function (ele, index) {
        var subFilePath = filePath + '/' + ele;
        // fs.statSync(path[, options])
        // 查看文件的属性
        var info = fs.statSync(subFilePath)
        if (info.isDirectory()) {
            readDirSync(subFilePath);
        } else {
            // 找到 .png .jpg .jpeg .jif 文件
            let fileNameReg1 = /\.png|\.jpg|\.jpeg|\.jif/g;
            let shouldFormat1 = fileNameReg1.test(subFilePath.toLowerCase());
            if (shouldFormat1) {
                var str = subFilePath.substring(rootPath.length, subFilePath.length);
                imageArray.push(str);
            }
            // 找到 .mp4 .rmvb .mkv 文件
            let fileNameReg2 = /\.mp4|\.rmvb|\.mkv|\.mov/g;
            let shouldFormat2 = fileNameReg2.test(subFilePath.toLowerCase());
            if (shouldFormat2) {
                var str = subFilePath.substring(rootPath.length, subFilePath.length);
                videoArray.push(str);
            }
        }
    })
}

// 遍历
function bianLi() {
    imageArray = [];
    videoArray = [];
    readDirSync(rootPath)
    // console.log("资源路径: " + rootPath);
    // console.log("图片个数: " + imageArray.length);
    // console.log("视频个数: " + videoArray.length);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 起服务 */
http.createServer(function (req, res) {
    console.log('~~~~~~~~~ req.url = ', req.url)

    res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
    var pathname = url.parse(req.url, true).pathname;
    var method = req.method.toLowerCase();
    if (pathname == "/") {
        ejs.renderFile('views/pages/index.ejs', {}, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/image') {
        bianLi()
        ejs.renderFile('views/pages/image/image.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: imageArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/video') {
        bianLi()
        ejs.renderFile('views/pages/video/video.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: videoArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/videoDY') {
        bianLi()
        ejs.renderFile('views/pages/videoDY/videoDY.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: videoArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/media') {
        ejs.renderFile('views/pages/media/media.ejs', {}, function (err, data) {
            res.end(data);
        })
    } else {
        // var currentPath = req.url.substring(1, req.url.length);
        var currentPath = "." + req.url;
        currentPath = urlencode.decode(currentPath);
        // console.log('currentPath', req.url, currentPath);
        fs.readFile(currentPath, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                var extname = path.extname(currentPath)
                var mime = mimeModul.getMime(extname);
                var header = {
                    "Content-Type": "" + mime + "; charset='utf-8'",
                    // "Content-Range": 'bytes 0-' + (data.length - 1) + '/' + data.length,
                    // "Content-Length": data.length,
                }
                res.writeHead(200, header);
                res.write(data);
                res.end();
            }
        });
    }
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');



