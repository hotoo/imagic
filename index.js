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

doc.createElement = function(tagName){

  tagName = String(tagName).toUpperCase();

  var isImage = tagName === "IMG";

  var element = createElement.call(doc, isImage ? "I" : tagName);

  if (isImage) {

    var image = element._image = new Image(1,1);
    element.on = function(eventName, handler){
      image.on.call(image, eventName, handler);
      return element;
    };
    element.off = function(eventName, handler){
      image.off.call(image, eventName, handler);
      return element;
    };
    //element.on = image.on.bind(image);
    //element.off = image.off.bind(image);

    element.__defineSetter__("src", function(value){
      this._image.src = value;
    });
    element.__defineGetter__("src", function(value){
      return this._image.src;
    });

    element.__defineSetter__("status", function(value){
      this._image.status = value;
    });
    element.__defineGetter__("status", function(value){
      return this._image.status;
    });

    element.__defineSetter__("onload", function(value){
      this._image.onload = value;
    });
    element.__defineGetter__("onload", function(value){
      return this._image.onload;
    });

    element.__defineSetter__("onerror", function(value){
      this._image.onerror = value;
    });
    element.__defineGetter__("onerror", function(value){
      return this._image.onerror;
    });

    element.__defineSetter__("onabort", function(value){
      this._image.onabort = value;
    });
    element.__defineGetter__("onabort", function(value){
      return this._image.onabort;
    });

  }

  return element;

};

window.Image = Image;
module.exports = Image;
