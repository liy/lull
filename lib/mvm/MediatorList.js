function MediatorList(array, parent, options){
  // this items array will contains Mediator or MediatorList instances, also String and Number value.
  this._items = [];

  Mediator.call(this, array, parent, options);
}
var p = MediatorList.prototype = Object.create(Mediator.prototype);

/**
 * Override the Mediator sync function. It will sync the items array.
 */
p.sync = function(){
  // Reset and clear the items array, getting ready for Mediator, MediatorList instance and other values assignment.
  this._items.length = 0;

  for(var i=0; i<this._model.length; ++i){
    this._items.push(this._preprocess(this._model[i]));
  }
}

p._preprocess = function(model){
  var item;
  if(model instanceof Array)
    item = new MediatorList(model);
  else if(model instanceof Object)
    item = new Mediator(model, this);
  else
   item = model;

  return item;
}

p.push = function(value){
  this._items.push(this._preprocess(value));
  this._model.push(value);

  this.propagateEvent(new ModelEvent(ModelEvent.ADD, this._model.length-1, this));
}

p.pop = function(){
  var item = this._items.pop();
  var model = this._model.pop();

  this.propagateEvent(new ModelEvent(ModelEvent.REMOVE, this._model.length-1, this));

  return item;
}

p.set = function(index, value){
  if(value instanceof Mediator || value instanceof MediatorList){
    this._items[index] = value;
    this._model[index] = value._model;
  }
  else{
    this._items[index] = this._preprocess(value);
    this._model[index] = value;
  }

  this.propagateEvent(new ModelEvent(ModelEvent.UPDATE, index, this));
}

p.get = function(index){
  return this._items[index];
}

Object.defineProperty(p, "length", {
  get: function(){
    return this._items.length;
  },
  set: function(value){
    this._items.length = value;
    this._model.length = value;

    this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
  },
  enumerable: true,
  configurable: true
});