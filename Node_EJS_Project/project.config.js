var path = require("path")

// 1-本地(sources文件夹)资源,2-iCloud资源
let sourceType = 1; 

let rootPath = ''
let ipUrl = ''

switch (sourceType) {
    case 1:
        rootPath = path.join(__dirname) + '/sources'; // __dirname当前路径(不包含文件名)
        ipUrl = 'http://127.0.0.1:8090/sources'
        break;
    case 2:
        rootPath = '/Users/guolongfei/Library/Mobile Documents/com~apple~CloudDocs'
        ipUrl = 'http://127.0.0.1:8080'
        break;
    default:
        console.log('请选择合适的资源地址')
}

module.exports = {
    sourceType,
    rootPath,
    ipUrl,
};




