# 演示文档

---

````javascript
seajs.use('imagic', function(Image){

  var img = new Image(1,1);
  img.onload = function(){
    console.log("loaded", this.src);
  };

  img.on("fetch", function(src){
    console.log("fetch", src);
  }).on("load", function(){
    console.log("load", this.src);
  });

  img.src = "http://www.google.com.hk/logos/doodles/2014/2014-winter-olympics-5710368030588928-hp.jpg";

});
````
