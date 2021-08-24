/** Official */
let fs = require("fs")
let http = require('http');
let url = require('url');
let path = require("path")
/** Vendor */
let urlencode = require('urlencode');
let ejs = require('ejs');
/** Custom */
let mimeModul = require('./getmime.js');
let {sourceType, rootPath, ipUrl} = require('./project.config.js')

let imageArray = []
let videoArray = []
let htmlArray = []

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 遍历数据 */
// 使用异步获取路径
function readDirSync(filePath) {
    // 读取目录的内容
    let pa = fs.readdirSync(filePath);
    pa.forEach(function (ele, index) {
        // 查看文件的属性
        let subFilePath = filePath + '/' + ele;
        let info = fs.statSync(subFilePath)
        if (info.isDirectory()) {
            readDirSync(subFilePath);
        } else {
            // 图片（.png .jpg .jpeg .jif）
            let imgReg = /\.png|\.jpg|\.jpeg|\.jif/g;
            let imgFormat = imgReg.test(subFilePath.toLowerCase());
            if (imgFormat) {
                let str = subFilePath.substring(rootPath.length, subFilePath.length);
                imageArray.push(str);
            }
            // 视频（.mp4 .rmvb .mkv）
            let videoReg = /\.mp4|\.rmvb|\.mkv|\.mov/g;
            let videoFormat = videoReg.test(subFilePath.toLowerCase());
            if (videoFormat) {
                let str = subFilePath.substring(rootPath.length, subFilePath.length);
                videoArray.push(str);
            }
            // 网页
            let htmlReg = /\.webarchive|\.html/g;
            let htmlFormat = htmlReg.test(subFilePath.toLowerCase());
            if (htmlFormat) {
                let str = subFilePath.substring(rootPath.length, subFilePath.length);
                htmlArray.push(str);
            }
        }
    })
}

// 遍历
function bianLi() {
    imageArray = [];
    videoArray = [];
    readDirSync(rootPath)
    console.log("资源路径: " + rootPath);
    console.log("图片个数: " + imageArray.length);
    console.log("视频个数: " + videoArray.length);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 起服务 */
http.createServer(function (req, res) {
    // console.log('~~~~~~~~~ req.url = ', req.url)

    res.writeHead(200, {"Content-Type": "text/html; charset='utf-8'"});
    let pathname = url.parse(req.url, true).pathname;
    let method = req.method.toLowerCase();

    if (pathname == "/") {
        ejs.renderFile('views/pages/index.ejs', {}, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/image') { // 图片
        bianLi()
        ejs.renderFile('views/pages/image/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: imageArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/imageCSS') { // 图片
        bianLi()
        ejs.renderFile('views/pages/imageCSS/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: imageArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/video') { // 视频
        bianLi()
        ejs.renderFile('views/pages/video/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: videoArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/videoCSS') { // 视频
        bianLi()
        ejs.renderFile('views/pages/videoCSS/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: videoArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/videoDY') { // 抖音视频
        bianLi()
        ejs.renderFile('views/pages/videoDY/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: videoArray
        }, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/iframe') { // iframe（图片 + 视频）
        ejs.renderFile('views/pages/iframe/index.ejs', {}, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/setting') { // 设置
        ejs.renderFile('views/pages/setting/index.ejs', {}, function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/test') { // test
        bianLi()
        ejs.renderFile('views/pages/test/index.ejs', {
            sourceType: sourceType,
            ipUrl: ipUrl,
            list: htmlArray
        }, function (err, data) {
            res.end(data);
        })
    } else {
        let currentPath = "." + req.url;
        currentPath = urlencode.decode(currentPath);
        fs.readFile(currentPath, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                let extname = path.extname(currentPath)
                let mime = mimeModul.getMime(extname);
                let header = {
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



