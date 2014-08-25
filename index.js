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


function setter(value){

  var context = this;
  var evt = context._evt;

  context._evt.trigger("fetch", value);
  EVT.trigger("fetch", value);

  this._src_ = value;

  setTimeout(function(){

    var status;
    if (context.hasOwnProperty("status")){
      status = context.status;
    } else {
      status = Image.status || DEFAULT_STATE;
    }

    context._evt.trigger(status);
    EVT.trigger(status, context._src_);

    var onhandler = context["on"+status];
    if (typeof onhandler === "function"){
      onhandler.call(context);
    } else { }

  }, context.responseTime || Image.responseTime || DEFAULT_RESPONSE_TIME);

}

function getter(){
  return this._src_;
}


var Image = function(width, height){

  this.width = width;
  this.height = height;

  this._evt = new Events();

  Object.defineProperty(this, "src", {
    set: setter,
    get: getter
  });

};

Image.STATUS = {
  LOAD: "load",
  ERROR: "error",
  ABORT: "abort"
};

Image.prototype = {
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

HTMLImageElement.prototype.on = function(eventName, handler){
  this._evt.on(eventName, handler, this);
  return this;
};
HTMLImageElement.prototype.off = function(eventName, handler){
  this._evt.off(eventName, handler, this);
  return this;
};

doc.createElement = function(tagName){

  var element = createElement.call(doc, tagName);
  var src;

  if (tagName && (tagName = String(tagName).toUpperCase()) === "IMG") {

    element._evt = new Events();
    element.__defineSetter__("src", setter);
    element.__defineGetter__("src", getter);

  }

  return element;

};

window.Image = Image;
module.exports = Image;
