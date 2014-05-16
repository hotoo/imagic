# 演示文档

---

````javascript
seajs.use('../index', function(Image){

  var img = new Image(1,1);
  img.onload = function(){
    console.log("loaded", this.src);
  };

  Image.on("fetch", function(src){
    console.log("global fetch", src);
    Image.off("fetch");
  }).on("load", function(src){
    console.log("global load", src);
    Image.off("load");
  });

  img.on("fetch", function(src){
    console.log("fetch", src);
    img.off("fetch");
  }).on("load", function(){
    console.log("load", this.src);
    img.off("load");
  });

  img.src = "http://www.google.com/logo.png";

});
````
