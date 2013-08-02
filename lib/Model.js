function Model(json){
  this.data = json;
  // views registers itself to the model's event.
  this.views = [];
}
var p = Model.prototype;

p._registerView = function(view){
  if(this.views.indexOf(view) === -1)
    this.views.push(view);
}