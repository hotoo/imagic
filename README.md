# imagic

---

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

## API

### Image([width, height])

构造函数，`width` 和 `height` 值为整数型，参数可选。

### image.callbackState

`Image.CALLBACK_STATE` 枚举类型，可选值如下：
设置这个成员属性，可以指定 Image 的请求返回状态。
默认是 `Image.CALLBACK_STATE.LOAD` 状态。

* `Image.CALLBACK_STATE.LOAD`
* `Image.CALLBACK_STATE.ERROR`
* `Image.CALLBACK_STATE.ABORT`

### image.src

字符串(String) 类型，修改 src 成员的值时，模拟发起资源请求。

### image.onload

模拟请求图片资源成功时，回调 `onload` 方法。

### image.onerror

模拟请求图片资源失败时，回调 `onerror` 方法。

可以通过设置 `callbackState` 为 `Image.CALLBACK_STATE.ERROR` 模拟。

### image.onabort

模拟图片资源请求取消时，回调 `onabort` 方法。

可以通过设置 `callbackState` 为 `Image.CALLBACK_STATE.ABORT` 模拟。

### image.on(eventName, handler)

指定事件监听方法。

### image.off(eventName, handler)

取消事件监听方法。

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
