var fs = require('fs');

exports.getMime = function (extname) {
    // switch(extname) {
    //    case ".html":
    //       return "text/html;charset='utf-8'";
    //    case ".js":
    //       return "text/javascript";
    //    case ".css":
    //       return "text/css";
    //    case ".gif":
    //       return "image/gif";
    //    case ".jpg":
    //       return "image/jpeg";
    //    case ".png":
    //       return "image/png";
    //    default:
    //       return "application/octet-stream";
    // }  

    var data = fs.readFileSync('./mime.json');
    var mimes = JSON.parse(data.toString());
    return mimes[extname] || 'text/html';
}

