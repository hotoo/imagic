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

function defineProperty(context, property, val, evt){
  Object.defineProperty(context, property, {
    set: function(value){

      evt.trigger("fetch", value);
      EVT.trigger("fetch", value);

      val = value;

      setTimeout(function(){

        var status;
        if (context.hasOwnProperty("status")){
          status = context.status;
        } else {
          status = Image.status || DEFAULT_STATE;
        }

        evt.trigger(status);
        EVT.trigger(status, val);

        try {
          context["on"+status].call(context);
        } catch (ex) {}

      }, context.responseTime || Image.responseTime || DEFAULT_RESPONSE_TIME);
    },
    get: function(){
      return val;
    }
  });
}

var Image = function(width, height){

  this.width = width;
  this.height = height;
  var src;

  this._evt = new Events();

  defineProperty(this, "src", src, this._evt);

};

Image.STATUS = {
  LOAD: "load",
  ERROR: "error",
  ABORT: "abort"
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


Image.on = function(eventName, handler){
  EVT.on(eventName, handler, Image);
  return this;
};
Image.off = function(eventName, handler){
  EVT.off(eventName, handler, Image);
  return this;
};


// document.createElement("img") support.
var doc = document;
var createElement = doc.createElement;

HTMLElement.prototype.status = DEFAULT_STATE;
HTMLElement.prototype.onload = empty;
HTMLElement.prototype.onerror = empty;
HTMLElement.prototype.onabort = empty;
HTMLElement.prototype.on = function(eventName, handler){
  this._evt.on(eventName, handler, this);
  return this;
};
HTMLElement.prototype.off = function(eventName, handler){
  this._evt.off(eventName, handler, this);
  return this;
};

doc.createElement = function(tagName){

  var element = createElement.call(doc, tagName);
  var src;

  if (tagName && (tagName = String(tagName).toUpperCase()) === "IMG") {

    element._evt = new Events();
    defineProperty(element, "src", src, element._evt);

  }

  return element;

};

window.Image = Image;
module.exports = Image;
