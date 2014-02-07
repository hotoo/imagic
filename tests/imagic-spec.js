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
      img.status = Image.STATUS.ERROR;
      img.on("error", function(){
        expect(this.src).to.equal(URL);
        done();
      });
      img.src = URL;
    });

    it('Event abort: '+URL, function(done){
      var img = new Image();
      img.status = Image.STATUS.ABORT;
      img.on("abort", function(){
        expect(this.src).to.equal(URL);
        done();
      });
      img.src = URL;
    });

    it('onload: '+URL, function(done){
      var img = new Image();
      img.status = Image.STATUS.LOAD;
      img.onload = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

    it('onerror: '+URL, function(done){
      var img = new Image();
      img.status = Image.STATUS.ERROR;
      img.onerror = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

    it('onabort: '+URL, function(done){
      var img = new Image();
      img.status = Image.STATUS.ABORT;
      img.onabort = function(){
        expect(this.src).to.equal(URL);
        done();
      };
      img.src = URL;
    });

    it('Global Image Event fetch: '+URL, function() {

      var img = new Image(1,1);

      Image.on("fetch", function(src){
        expect(src).to.equal(URL);
      });

      img.src = URL;

      Image.off("fetch");
    });

    it('Global Image Event load: '+URL, function(done){
      var img = new Image();

      Image.on("load", function(src){
        expect(src).to.equal(URL);
        Image.off("load");
        done();
      });

      img.src = URL;
    });

    it('Global Image Event error: '+URL, function(done){
      var img = new Image();

      Image.status = Image.STATUS.ERROR;
      Image.on("error", function(src){

        expect(src).to.equal(URL);

        Image.status = Image.STATUS.NULL;
        Image.off("error");

        done();
      });

      img.src = URL;
    });

    it('Global Image Event abort: '+URL, function(done){
      var img = new Image();

      Image.status = Image.STATUS.ABORT;
      Image.on("abort", function(src){

        expect(src).to.equal(URL);

        Image.status = Image.STATUS.NULL;
        Image.off("abort");

        done();
      });

      img.src = URL;
    });

  });

});
