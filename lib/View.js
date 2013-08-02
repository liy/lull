function View(obj){
  this._setModel(obj.model);
}
var p = View.prototype;

p._setModel = function(model){
  this._model = model;
  this._model._registerView(this);
}

/**
 * Render the view to the DOM, using the model data.
 */
p.render = function(){

}