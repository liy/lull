function MediatorList(array, parent, options){
  // contains Mediator or MediatorList instances, also String and Number value.
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
    this._items.push(this._wrap(this._model[i]));
  }
}

/**
 * Wrap the model with Mediator or MediatorList if necessary
 * @param  {Object} model The json object model
 * @return {Mediator, String, Number}       A wrapped version of original model, Mediator instance for Object, MediatorList instance for Array. 
 *                          Or primitive String and Number.
 */
p._wrap = function(model){
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
  this._items.push(this._wrap(value));
  this._model.push(value);

  this.propagateEvent(new ModelEvent(ModelEvent.ADD, this));
}

p.pop = function(){
  var item = this._items.pop();
  var model = this._model.pop();

  this.propagateEvent(new ModelEvent(ModelEvent.REMOVE, this));

  return item;
}

p.set = function(index, value){
  if(value instanceof Mediator || value instanceof MediatorList){
    this._items[index] = value;
    this._model[index] = value._model;
  }
  else{
    this._items[index] = this._wrap(value);
    this._model[index] = value;
  }

  this.propagateEvent(new ModelEvent(ModelEvent.UPDATE, this));
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

    this.propagateEvent(new ModelEvent(ModelEvent.UPDATE, this));
  },
  enumerable: true,
  configurable: true
});