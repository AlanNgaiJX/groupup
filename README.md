#### Groupup

一个以讨论组为载体的社交应用，开放用户注册、登录，创建群组，发布群组动态，进行动态评论等功能。

#### Demo预览

[预览链接](http://18.162.113.209:9001/groupup/)

或扫描QRcode
![image](https://github.com/AlanNgaiJX/groupup/blob/master/onlineQRcode.png)

* ps：预览服务器身处中国境外，走的国际带宽；如果您是中国的访问者，这可能会有点慢，请谅解。

#### 平台

移动web端，spa应用，已针对微信h5、Google、x5等主流浏览器作出适配与优化

#### 前端所使用技术栈
* 架构：MVVM
* 基础框架：react + redux + react-router
* 引用UI：ant-design-mobile
* 其他依赖：exif（获取图片exif信息），crypto（加解密与传输），aixos，moment..等

#### 已实现
* 注册、登录
* 主页、群组页、个人页
* 创建群组、发布动态、点赞与评论
等13个核心页面及功能模块。

#### 已调优
* 图片懒加载
* 路由懒加载
* 构建分包
* 重要信息对称加密传输
* gzip压缩
* 静态资源缓存

#### 后端

后端是一个express + mongoose + mongodb 的node应用，详见[myServer](https://github.com/AlanNgaiJX/myServer)


#### 前端部署

* 开发环境
```
yarn run start
```

* build

```
yarn run build
```

* build with no srouce-map，构建时shake掉sourcemap

```
yarn run build-no-sourcemap
```

* check source-map-explorer，查看构建依赖与包体积（须有source-map）

```
yarn run analyze
```