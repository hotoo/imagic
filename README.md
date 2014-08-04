# imagic

---

[![spm package](http://spmjs.io/badge/imagic)](http://spmjs.io/package/imagic)
[![Build Status](https://secure.travis-ci.org/hotoo/imagic.png?branch=master)](https://travis-ci.org/hotoo/imagic)
[![Coverage Status](https://coveralls.io/repos/hotoo/imagic/badge.png?branch=master)](https://coveralls.io/r/hotoo/imagic)


Imagic send data by image, for tests mock.

---

## 使用说明

```js
seajs.use(["imagic"], function(Image){

  var img = new Image(1,1);
  img.onload = function(){
    console.log("loaded", this.src);
  };
  img.src = "http://www.google.com/logo.png";

  // test code example.
  img.on("fetch", function(){
    console.log("fetch", this.src);
  }).on("load", function(){
    console.log("load", this.src);
  })

});
```

上面的实例要求修改源码中的 img 对象。
在实际场景中，一般无法取到 img 对象，为了不侵入源码而提供 mock 支持，
每个 img 实例触发 fetch, load 等事件时，同时会触发 Image 全局对象的对应事件。
可以在不侵入源码的情况下，编写如下通用测试代码。

假设下面的 tracker 模块调用 log 方法时，通过 Image 发送图片请求来发送日志。

```js
define("tracker", function(require, exports, module){
  var BASE = "http://www.example.com/";
  var Tracker = {
    log: function(seed){
      var img = new Image(1,1);
      img.onload = img.onerror = img.onabort = function(){};
      img.src = BASE + "?seed=" + seed;
    }
  };
  module.exports = Tracker;
});
```

测试范例代码如下：

```js
seajs.use(["imagic", "tracker"], function(Image, Tracker){
  Image.on("fetch", function(src){
    console.log("test", src.indexOf("?seed=seed")>=0 ? "passed":"failed");
  });
  Tracker.log("seed");
  Image.off("fetch");
});
```

## API

### Image([width, height])

构造函数，`width` 和 `height` 值为整数型，参数可选。

### Image.on(eventName, handler)

全局的模拟图像事件监听接口。
所有的模拟图像实例触发的事件，全局图像都会同时触发同样的事件。

事件处理函数 handler 的参数是 src 值。

### Image.off(eventName, handler)

全局的模拟图像事件解除监听接口。

### Image.status

全局模拟图像状态标识，`Image.STATUS` 枚举类型，可选值如下：
设置这个成员属性，可以指定 Image 的请求返回状态。
默认是 `Image.STATUS.LOAD` 状态。

* `Image.STATUS.LOAD`
* `Image.STATUS.ERROR`
* `Image.STATUS.ABORT`

### image.status

特定模拟图像实例的状态，同 `Image.status`。

### image.src

字符串(String) 类型，修改 src 成员的值时，模拟发起资源请求。

### image.onload

模拟请求图片资源成功时，回调 `onload` 方法。

### image.onerror

模拟请求图片资源失败时，回调 `onerror` 方法。

可以通过设置 `status` 为 `Image.STATUS.ERROR` 模拟。

### image.onabort

模拟图片资源请求取消时，回调 `onabort` 方法。

可以通过设置 `status` 为 `Image.STATUS.ABORT` 模拟。

### image.on(eventName, handler)

指定事件监听方法。

### image.off(eventName, handler)

取消事件监听方法。

### image.status

可以使用 Image.STATUS 的枚举值：

* `Image.STATUS.LOAD`：测试图片加载成功时，使用这个状态。会触发 load 事件，调用 onload 方法。
* `Image.STATUS.ERROR`：测试图片加载失败时，使用这个状态，会触发 error 事件，调用 onerror 方法。
* `Image.STATUS.ABORT`：测试图片请求取消时，使用这个状态，会触发 abort 事件，调用 onabort 方法。

例如：

```js
image.status = Image.STATUS.LOAD;
```

### Image.status

同 image.status，但是针对全局设置，未设置的实例，会使用全局设置。

```js
Image.status = Image.STATUS.ERROR;
```

### image.responseTime

设置图片请求的响应时间。整型数值，单位为毫秒(ms)。

```js
image.responseTime = 100;
```

### Image.responseTime

设置全局的图片请求响应时间，同 image.responseTime。
未设置的实例，会使用全局设置。
如果同时未设置全局响应时间，则使用默认的响应时间 0ms，立即响应。

## Events

对象使用 `on`, `off` 方法绑定、解绑事件，eventName 支持以下事件类型。

### fetch

模拟发起资源请求前，触发 `fetch` 事件，事件处理函数携带 `src` 参数。

### load

模拟请求资源成功时，触发 `load` 事件。

### error

模拟请求资源成功时，触发 `error` 事件。

### abort

模拟请求资源成功时，触发 `abort` 事件。
