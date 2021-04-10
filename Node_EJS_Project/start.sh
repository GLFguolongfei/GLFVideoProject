

rootDir=$(cd $(dirname $0); pwd)
echo ${rootDir}

# 1-本地(sources文件夹)资源,2-iCloud资源
sourceType=1

# 新开一个命令行执行命令
if [ $sourceType == 2 ]
then
	open -a Terminal.app startiCloud.sh
fi

# 启动服务
node server.js



