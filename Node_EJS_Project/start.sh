

rootDir=$(cd $(dirname $0); pwd)
echo ${rootDir}
echo "参数: $@";


# 函数定义
startServer() {
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
}


if [ $# -eq 0 ] # 如果传入参数个数为0个
then
    # 1-本地资源(sources文件夹)
    # 2-iCloud资源
    # 3-Document资源
    sourceType=2
	# 函数执行
    startServer
elif [ $# -eq 1 ] # 如果传入参数个数为1个
then
    # 获取第一个参数
    sourcePath=$1

    if [ ${#sourcePath} -lt 3 ] # 参数长度小于3,为类型
    then
        # 设置类型
        sourceType=$1
        # 函数执行
        startServer
    elif [ ${#sourcePath} -ge 3 ] # 参数长度大于等于3,为路径
    then
        echo '自定义路径'

        # 把路径中的"/"替换为":"
        ppp=${sourcePath//\//\\/}
        echo $ppp

        # sed
        searchStr='let sourceType ='
        replaceStr='let sourceType = 99 \/\/'
        sed -i '' "s/$searchStr/$replaceStr/g" project.config.js

        # sed
        searchStr='let rootPath ='
        replaceStr='let rootPath = \"'$ppp'\" \/\/'
        sed -i '' "s/$searchStr/$replaceStr/g" project.config.js

        # sed
        searchStr='let ipUrl ='
        replaceStr='let ipUrl = \"http:\/\/127.0.0.1:8080\" \/\/'
        sed -i '' "s/$searchStr/$replaceStr/g" project.config.js

        # 新开一个命令行执行脚本
        open -a Terminal.app startServer.sh

        # 起资源服务
        cd $sourcePath
        live-server
    fi
fi



