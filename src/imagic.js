// Image util for test-case by window.Image send data.
define(function(require, exports, module){

  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objectss#Defining_getters_and_setters
  //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch
  if(typeof Object.defineProperty !== "function"){
    throw new Error("not support.");
  }

  var Events = require("events");
  function empty(){}

  var LOAD_TIME = 50;
  var DEFAULT_STATE = "load";

  var Image = function(width, height){

    this.width = width;
    this.height = height;
    var src;

    this.callbackState = DEFAULT_STATE;
    this._evt = new Events();

    Object.defineProperty(this, "src", {
      set: function(source){

        this._evt.trigger("fetch", source);

        src = source;

        var me = this;
        setTimeout(function(){

          me._evt.trigger(me.callbackState);
          me["on"+me.callbackState].call(me);

        }, this.loadTime || LOAD_TIME);
      },
      get: function(){
        return src;
      }
    });

  };

  Image.prototype = {
    onload: empty,
    onerror: empty,
    onabort: empty,
    on: function(eventName, handler){
      this._evt.on(eventName, handler, this);
      return this;
    },
    off: function(eventName, handler){
      this._evt.off(eventName, handler, this);
      return this;
    }
  };
  Image.CALLBACK_STATE = {
    LOAD: "load",
    ERROR: "error",
    ABORT: "abort"
  };

  module.exports = Image;
});
