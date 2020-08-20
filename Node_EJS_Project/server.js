

var fs = require("fs")
var http = require('http');
var url = require('url');
var path = require("path")
var urlencode = require('urlencode');
var ejs = require('ejs');
var mimeModul = require('./getmime.js');

var relativePath = '/sources';
var rootPath = path.join(__dirname) + relativePath; // __dirname当前路径(不包含文件名)
var imageArray = [];
var videoArray = [];

readDirSync(rootPath)
// 使用异步获取路径
// 参数是遍历文件的根路径
function readDirSync(filePath) {
	// fs.readdirSync(path[, options])
	// 读取目录的内容
  	var pa = fs.readdirSync(filePath);
  	pa.forEach(function(ele, index) {
  		var subFilePath = filePath + '/' + ele;
  		// fs.statSync(path[, options])
  		// 查看文件的属性
	    var info = fs.statSync(subFilePath)  
	    if(info.isDirectory()) {
	      	readDirSync(subFilePath);
	    } else {
	      	// 找到 .mp4 .rmvb 文件
	      	let fileNameReg1 = /\.mp4|\.rmvb/g;
	      	let shouldFormat1 = fileNameReg1.test(subFilePath.toLowerCase());
	      	if (shouldFormat1) {
	      		var str = subFilePath.substring(__dirname.length, subFilePath.length);
	      		videoArray.push(str);
	      	}
	      	// 找到 .png .jpg .jpeg .jif 文件
	      	let fileNameReg2 = /\.png|\.jpg|\.jpeg|\.jif/g;
	      	let shouldFormat2 = fileNameReg2.test(subFilePath.toLowerCase());
	      	if (shouldFormat2) {
	      		var str = subFilePath.substring(__dirname.length, subFilePath.length);
	      		imageArray.push(str);
	      	}
	    }  
  	})
}

console.log("图片个数: " + imageArray.length);
console.log("视频个数: " + videoArray.length);

http.createServer(function(req,res) {
	console.log(req.url);
	res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
	var pathname = url.parse(req.url,true).pathname;
	var method = req.method.toLowerCase();
	if (pathname=="/" || pathname=='/introduce') {
		ejs.renderFile('views/introduce.ejs',{

		},function(err,data){
			res.end(data);
		})
	} else if (pathname == '/images') {
		ejs.renderFile('views/images.ejs',{
			list: imageArray
		},function(err,data){
			res.end(data);
		})
	} else if (pathname == '/video') {
		ejs.renderFile('views/video.ejs',{
			list: videoArray
		},function(err,data){
			res.end(data);
		})
	} else {
		// var currentPath = req.url.substring(1, req.url.length);
		var currentPath = "." + req.url;
		currentPath = urlencode.decode(currentPath);
		// console.log(currentPath);
		fs.readFile(currentPath, function(error, data) {
	      	if (error) {
		        console.log(error);
	      	} else {    
	         	var extname = path.extname(currentPath)
	         	var mime = mimeModul.getMime(extname);  
	         	res.writeHead(200, {"Content-Type":""+mime+";charset='utf-8'"});
	         	res.write(data);     
	         	res.end();  
	      	}
	   	});  
	}
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');




