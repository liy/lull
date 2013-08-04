// /**
//  * Mediator
//  * @param {JSON} model
//  */
// function Mediator(model, options){
//   EventDispatcher.call(this);

//   this.model = model;
//   this.views = [];
//   this.options = options;
// }
// var p = Mediator.prototype = Object.create(EventDispatcher.prototype);

// p._registerView = function(view){
//   if(this.views.indexOf(view) === -1)
//     this.views.push(view);
// }

// p._unregisterView = function(view){
//   var index = this.views.indexOf(view);
//   if(index != -1)
//     this.views.splice(index, 1);
// }

// p.get = function(attribute){
//   return this.model[attribute];
// }

// p.set = function(hash){
//   // console.log(hash);
//   var newKeys = [];
//   for(var key in hash){
//     if(!this.model.hasOwnProperty(key))
//       newKeys.push(key);

//     this.model[key] = hash[key];
//   }

//   if(newKeys.length != 0)
//       this.dispatchEvent(new ModelEvent(ModelEvent.ADD, newKeys));

//   this.dispatchEvent(new ModelEvent(ModelEvent.UPDATE, Object.keys(hash)));
// }

// p.set = function(pairs){
//   // var keys =
// }