
var expect = require("expect.js");
var Image = require('../index');

var URL = "http://www.google.com/logo.png";

describe('document.createElement("img")', function() {

  it('Event fetch: '+URL, function() {

    var img = document.createElement("img");

    img.on("fetch", function(src){
      expect(src).to.equal(URL);
    });

    img.src = URL;
    document.body.appendChild(img);

    img.off("fetch");
  });

  it('Event load: '+URL, function(done){
    var img = document.createElement("img");
    img.on("load", function(){
      expect(this.src).to.equal(URL);
      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

  it('Event error: '+URL, function(done){
    var img = document.createElement("img");
    img.status = Image.STATUS.ERROR;
    img.on("error", function(){
      expect(this.src).to.equal(URL);
      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

  it('Event abort: '+URL, function(done){
    var img = document.createElement("img");
    img.status = Image.STATUS.ABORT;
    img.on("abort", function(){
      expect(this.src).to.equal(URL);
      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

  // TODO: onload, onerror, onabort NOT SUPPORT in Safari, Phantom.
  //it('onload: '+URL, function(done){
    //var img = document.createElement("img");
    //img.status = Image.STATUS.LOAD;
    //img.onload = function(){
      //expect(this.src).to.equal(URL);
      //done();
    //};
    //
    //img.src = URL;
    //document.body.appendChild(img);
  //});

  //it('onerror: '+URL, function(done){
    //var img = document.createElement("img");
    //img.status = Image.STATUS.ERROR;
    //img.onerror = function(){
      //expect(this.src).to.equal(URL);
      //done();
    //};
    //
    //img.src = URL;
    //document.body.appendChild(img);
  //});

  //it('onabort: '+URL, function(done){
    //var img = document.createElement("img");
    //img.status = Image.STATUS.ABORT;
    //img.onabort = function(){
      //expect(this.src).to.equal(URL);
      //done();
    //};
    //
    //img.src = URL;
    //document.body.appendChild(img);
  //});

  it('Global Image Event fetch: '+URL, function() {

    var img = document.createElement("img");

    Image.on("fetch", function(src){
      expect(src).to.equal(URL);
    });

    img.src = URL;
    document.body.appendChild(img);

    Image.off("fetch");
  });

  it('Global Image Event load: '+URL, function(done){
    var img = document.createElement("img");

    Image.on("load", function(src){
      expect(src).to.equal(URL);
      Image.off("load");
      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

  it('Global Image Event error: '+URL, function(done){
    var img = document.createElement("img");

    Image.status = Image.STATUS.ERROR;
    Image.on("error", function(src){

      expect(src).to.equal(URL);

      Image.status = Image.STATUS.NULL;
      Image.off("error");

      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

  it('Global Image Event abort: '+URL, function(done){
    var img = document.createElement("img");

    Image.status = Image.STATUS.ABORT;
    Image.on("abort", function(src){

      expect(src).to.equal(URL);

      Image.status = Image.STATUS.NULL;
      Image.off("abort");

      done();
    });

    img.src = URL;
    document.body.appendChild(img);
  });

});
