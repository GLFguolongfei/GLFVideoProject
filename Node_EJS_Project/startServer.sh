

# 切换到路径
rootDir=$(cd $(dirname $0); pwd)
cd $rootDir

# 启动服务
node server.js

