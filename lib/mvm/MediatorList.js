function MediatorList(arr, parent){
  EventDispatcher.call(this);

  this._model = arr;
  this._parent = parent;

  // note that this array can also contains primitive values, String, Number, boolean, etc.
  this._mediators = [];

  this.sync();
}
var p = MediatorList.prototype = Object.create(EventDispatcher.prototype);

p.sync = function(){
  this._mediators.length = 0;

  for(var i=0; i<this._model.length; ++i){
    this._mediators.push(this._preprocess(this._model[i]));
  }
}

p._preprocess = function(model){
  var wrapper;
  if(model instanceof Array)
    wrapper = new MediatorList(model);
  else if(model instanceof Object)
    wrapper = new Mediator(model, this);
  else
   wrapper = model;

  return wrapper;
}

p.propagateEvent = function(evt){
  if(this._parent){
    this.dispatchEvent(evt);
    this._parent.propagateEvent(evt);
  }
  else
    this.dispatchEvent(evt);
}

p.push = function(value){
  this._preprocess(value);
  this._model.push(value);

  this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
}

p.pop = function(){
  var mediator = this._mediators.pop();
  var model = this._model.pop();

  this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
  return mediator;
}

p.set = function(index, value){
  if(value instanceof Mediator || value instanceof MediatorList){
    this._mediators[index] = value;
    this._model[index] = value._model;
  }
  else{
    this._mediators[index] = this._preprocess(value);
    this._model[index] = value;
  }

  this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
}

p.get = function(index){
  return this._mediators[index];
}

Object.defineProperty(p, "length", {
  get: function(){
    return this._mediators.length;
  },
  set: function(value){
    this._mediators.length = value;
    this._model.length = value;

    this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
  },
  enumerable: true,
  configurable: true
});