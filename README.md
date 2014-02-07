# imagic

---

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


### Events

### image.onload

模拟请求图片资源成功时，回调 `onload` 方法。

### image.onerror

模拟请求图片资源失败时，回调 `onerror` 方法。

可以通过设置 `callbackState` 为 `Image.CALLBACK_STATE.ERROR` 模拟。

### image.onabort

模拟图片资源请求取消时，回调 `onabort` 方法。

可以通过设置 `callbackState` 为 `Image.CALLBACK_STATE.ABORT` 模拟。
