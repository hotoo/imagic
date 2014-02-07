define(function(require) {

  var expect = require("expect");
  var Image = require('imagic');

  var URL = "http://www.google.com/logo.png";

  describe('imagic', function() {

    it('Event fetch: '+URL, function() {

      var img = new Image(1,1);

      img.on("fetch", function(src){
        expect(src).to.equal(URL);
      });

      img.src = URL;

      img.off("fetch");
    });

    it('Event load: '+URL, function(done){
      var img = new Image();
      img.on("load", function(){
        expect(this.src).to.equal(URL);
        done();
      });
      img.src = URL;
    });

    it('Event error: '+URL, function(done){
      var img = new Image();
      img.callbackState = Image.CALLBACK_STATE.ERROR;
      img.on("error", function(){
        expect(this.src).to.equal(URL);
        done();
      });
      img.src = URL;
    });

    it('Event abort: '+URL, function(done){
      var img = new Image();
      img.callbackState = Image.CALLBACK_STATE.ABORT;
      img.on("abort", function(){
        expect(this.src).to.equal(URL);
        done();
      });
      img.src = URL;
    });

    it('onload: '+URL, function(done){
      var img = new Image();
      img.callbackState = Image.CALLBACK_STATE.LOAD;
      img.onload = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

    it('onerror: '+URL, function(done){
      var img = new Image();
      img.callbackState = Image.CALLBACK_STATE.ERROR;
      img.onerror = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

    it('onabort: '+URL, function(done){
      var img = new Image();
      img.callbackState = Image.CALLBACK_STATE.ABORT;
      img.onabort = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

  });

});
