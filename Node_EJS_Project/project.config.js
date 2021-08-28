let path = require("path")

// 1-本地(sources文件夹)资源
// 2-iCloud资源
// 3-Document资源
let sourceType = 2 // 99 // 99 // 2

let rootPath = "/Volumes/GuoLongfei/1-电视剧/综艺频道" // "/Volumes/我的文档/会所" // "/Volumes/未命名/会所"
let ipUrl = "http://127.0.0.1:8080" // "http://127.0.0.1:8080" // "http://127.0.0.1:8080"

switch (+sourceType) {
    case 1:
        rootPath = path.join(__dirname) + '/sources'; // __dirname当前路径(不包含文件名)
        ipUrl = 'http://127.0.0.1:8090/sources'
        break;
    case 2:
        rootPath = '/Users/guolongfei/Library/Mobile Documents/com~apple~CloudDocs'
        ipUrl = 'http://127.0.0.1:8080'
        break;
    case 3:
        rootPath = '/Users/guolongfei/Documents/\[生活点滴\]/1-图片'
        ipUrl = 'http://127.0.0.1:8080'
        break;
    default:
        // console.log('请选择合适的资源地址')
}

module.exports = {
    sourceType,
    rootPath,
    ipUrl,
};




