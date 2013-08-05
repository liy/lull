function Mediator(model, parent, options){
  EventDispatcher.call(this);

  this._model = model;
  this._parent = parent;
  this._options = options

  this.sync();
}
var p = Mediator.prototype = Object.create(EventDispatcher.prototype);

p.sync = function(){
  for(var key in this._model){
    // do not add duplicated getter and setter
    if(this.hasOwnProperty(key))
      continue;

    // close off the value of the key, and also needs to make sure the scope is pointed to the Mediator instance.
    (function(key){

      if(this._model[key] instanceof Array){
        console.log('array');
      }

      if(this._model[key] instanceof Object){
        var mediator = this[key] = new Mediator(this._model[key], this);

        Object.defineProperty(this, key, {
          get: function(){
            return mediator;
          },
          set: function(value){
            this._model[key] = value;

            this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }
      else{
        Object.defineProperty(this, key, {
          get: function(){
            return this._model[key];
          },
          set: function(value){
            this._model[key] = value;

            this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }

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

p._registerView = function(view){
  if(this.views.indexOf(view) === -1)
    this.views.push(view);
}

p._unregisterView = function(view){
  var index = this.views.indexOf(view);
  if(index != -1)
    this.views.splice(index, 1);
}