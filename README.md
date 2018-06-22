# poc-blockchain
poc-blockchain

安装说明：
系统： Ubuntu 16.04 （必须）

安装sawtooth  https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/ubuntu.html
安装node 8.x（由于sawtooth-sdk的限制，目前支持是8.x版本）


部分需要安装的程序
```(bash)
   apt-get update && apt-get install -y -q --no-install-recommends \
    curl \
    ca-certificates \
    pkg-config \
    build-essential \
    libzmq3-dev \
   
   npm install -g prebuild-install
```



