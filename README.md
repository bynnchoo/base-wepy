### 安装（更新） wepy 命令行工具。
	npm install wepy-cli -g

### 安装依赖包
	npm install

### 开发实时编译。
	npm run dev

### 生产压缩
	npm run build //上传代码时，请先执行此命令，否则会提示包体积过大


### 开发使用说明(重要)

1、使用微信开发者工具-->添加项目，项目目录请选择dist目录。

2、微信开发者工具-->项目-->关闭ES6转ES5。 <font color=red>重要：漏掉此项会运行报错。</font> 

3、微信开发者工具-->项目-->关闭上传代码时样式自动补全。  <font color=red>重要：某些情况下漏掉此项也会运行报错。</font> 

4、微信开发者工具-->项目-->关闭代码压缩上传。  <font color=red>重要：开启后，会导致真机computed, props.sync 等等属性失效。</font> 



### wepy开发文档地址
	https://tencent.github.io/wepy/

### 小程序开发文档
	http://mp.weixin.qq.com/debug/wxadoc/dev/

### 演示地址

打开微信扫一扫


    
### 目录结构

    ├── api
    │   └── api.js              //接口
    ├── app.wpy                 //入口文件
    ├── components                  //组件
    │   ├
    │   ├
    │   └── tab.wpy             //选项卡组件
    ├── images                  //图片文件夹
    ├── pages                   //页面
    │   ├
    ├── plugins                 //插件
    ├── resources               //css 组件资源
    ├── styles                  //样式
    │   ├── base.less
    │   ├── icon.less           // 图标文件
    │   └── style.less
    └── utils                   //工具类
        ├── constant.js             //常量
        ├── md5.js                  //md5
        ├── regions.js              //省市区数据
        ├── tip.js                  //提示弹框组件
        ├── util.js                 //工具
        └── wxRequest.js            //ajax请求




### 部分功能截图




### 说明


### 如需帮助或咨询请加
=
### 友情赞助
如果本项目对你有较大的帮助，可以对我打赏，否则不需要，随便放个二维码，看看有没有对我特别好的小伙伴 ~ 哈哈



