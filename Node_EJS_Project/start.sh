

rootDir=$(cd $(dirname $0); pwd)
echo ${rootDir}

# 1-本地(sources文件夹)资源,2-iCloud资源
sourceType=2

# sed
# 将文件中的"let sourceType = "全部替换为"let sourceType = 1 //"
# s 取代
# g 全局
# sed -i '' 's/let sourceType = /let sourceType = '$sourceType' \/\//g' project.config.js
searchStr='let sourceType ='
replaceStr='let sourceType = '$sourceType' \/\/'
sed -i '' "s/$searchStr/$replaceStr/g" project.config.js

# 新开一个命令行执行脚本
if [ $sourceType == 2 ]
then
	open -a Terminal.app startiCloud.sh
elif [ $sourceType == 3 ]
then
	open -a Terminal.app startiDocument.sh
fi

# 启动服务
node server.js



