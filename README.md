# MouseCtrl

使用 NodeJs 开发可通过手机操作鼠标的小程序。

## 开发背景

有时会通过 Mac 的 AirPlay 连接到电视机，这样便可以大屏观看电脑中的视频。但是如果想要进行操作(例如切换其他视频等), 还需要到电脑前操作，因此开发了这个小程序。
启动程序后，通过手机扫描生成的本机地址二维码，便可以在手机上操控鼠标，不用再离开沙发到电脑前。

## Run

执行 `npm install && npm start`, 启动端口为 8016 的Web服务。通过两种方式访问:

- 使用手机浏览器访问 `http://电脑内网IP:8016`
- 在电脑中访问 `http://电脑内网IP:8016/server` 或者 `http://localhost:8016`, 将看到带有二维码的页面, 使用手机扫描此二维码

## 环境说明

- 只在 Mac、Linux 机器测试运行

## TODO

- 使用 nwjs 打包为 deb 和 dmg
- 测试稳定性
