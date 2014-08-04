// Image util for test-case by window.Image send data.


// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objectss#Defining_getters_and_setters
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch
if(typeof Object.defineProperty !== "function"){
  throw new Error("this platform not support imagic.");
}

var Events = require("arale-events");

var EVT = new Events();
function empty(){}

var DEFAULT_RESPONSE_TIME = 0;
var DEFAULT_STATE = "load";

var Image = function(width, height){

  this.width = width;
  this.height = height;
  var src;

  this._evt = new Events();

  Object.defineProperty(this, "src", {
    set: function(source){

      this._evt.trigger("fetch", source);
      EVT.trigger("fetch", source);

      src = source;

      var me = this;
      setTimeout(function(){

        var status;
        if (me.hasOwnProperty("status")){
          status = me.status;
        } else {
          status = Image.status || DEFAULT_STATE;
        }

        me._evt.trigger(status);
        EVT.trigger(status, src);

        me["on"+status].call(me);

      }, this.responseTime || Image.responseTime || DEFAULT_RESPONSE_TIME);
    },
    get: function(){
      return src;
    }
  });

};

Image.prototype = {
  status: DEFAULT_STATE,
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

Image.STATUS = {
  LOAD: "load",
  ERROR: "error",
  ABORT: "abort",
  NULL: ""
};

Image.status = Image.STATUS.NULL;

Image.on = function(eventName, handler){
  EVT.on(eventName, handler, Image);
  return this;
};
Image.off = function(eventName, handler){
  EVT.off(eventName, handler, Image);
  return this;
};

window.Image = Image;
module.exports = Image;
