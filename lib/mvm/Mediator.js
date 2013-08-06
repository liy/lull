function Mediator(model, parent, options){
  EventDispatcher.call(this);

  this._model = model;
  this._parent = parent;
  this._options = options

  this.sync();
}
var p = Mediator.prototype = Object.create(EventDispatcher.prototype);

/**
 * Sync the Mediator getter and setter with the model data.
 */
p.sync = function(){
  for(var key in this._model){
    // do not add duplicated getter and setter
    if(this.hasOwnProperty(key))
      continue;

    // closure, close off the value of the key, and also needs to make sure the scope is pointed to the Mediator instance.
    // http://stackoverflow.com/questions/10453725/weird-behavior-with-javascript-getter-setters
    (function(key){

      // wrap the model with Mediator or MediatorList if necessary
      var item;
      if(this._model[key] instanceof Array){
        item = this[key] = new MediatorList(this._model[key], this);
      }
      else if(this._model[key] instanceof Object){
        item = this[key] = new Mediator(this._model[key], this);
      }
      else{
        item = this._model[key];
      }

      // define the getter and setter named according to the model
      Object.defineProperty(this, key, {
          get: function(){
            return item;
          },
          set: function(value){
            this._model[key] = value;

            this.propagateEvent(new ModelEvent(ModelEvent.UPDATE, this));
          },
          enumerable: true,
          configurable: true
        });

    }).call(this, key);
  }
}

p.propagateEvent = function(evt){
  if(this._parent){
    this.dispatchEvent(evt);
    this._parent.propagateEvent(evt);
  }
  else
    this.dispatchEvent(evt);
}