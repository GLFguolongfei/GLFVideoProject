
rootPath="/Users/guolongfei/Library/Mobile Documents/com~apple~CloudDocs"
#rootPath="/Users/guolongfei/Downloads/Template"
echo $rootPath

# 清空文件内容
echo > iCloudVideo.js
echo > iCloudImage.js
echo > iCloudPaths.js

# 在 Linux 中内置分隔符 IFS（Internal Field Seperator）默认为空格、制表符、换行符
# 手动设置 IFS 排除空格分隔符
IFS=$'\n'

bianLi() {
    for file in $*
    do
        if test -f $file
        then
            # 文件输出
            case $file in
                *.mp4 | *.MP4 | *.rmvb | *.RMVB | *.mkv | *.MKV | *.mov | *.MOV)
                    echo $file >> iCloudVideo.js
                ;;
                *.jpg | *.jpeg | *.png | *.jif | *.JPG | *.JPEG | *.PNG | *.GIF | *.Gif)
                    echo $file >> iCloudImage.js
                ;;
                *)
                    echo $file >> iCloudPaths.js
                ;;
            esac
        fi
        if test -d $file
        then
            # 目录递归
            bianLi $file/*
        fi
    done
}

bianLi $rootPath/*


