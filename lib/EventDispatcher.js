/**
 * Dispatching event.
 */
function EventDispatcher(){
  this._listeners = [];
}
var p = EventDispatcher.prototype;

p.addListener = function(type, func){
  var listener = Object.create(null);
  listener.type = type;
  listener.func = func;
  this._listeners.push(listener);
};

p.removeListener = function(type, func){
  for(var i in this._listeners){
    if(this._listeners[i].type === type && func.toString() === this._listeners[i].func.toString()){
      this._listeners.splice(i, 1);
      return;
    }
  }
};

p.dispatchEvent = function(event){
  for(var i in this._listeners){
    if(this._listeners[i].type === event.type){
      this._listeners[i].func(event);
    }
  }
};

function Event(type){
  this.type = type;
}
Event.COMPLETE = 'complete';