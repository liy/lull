function View(mediator, options){
  this.mediator = mediator;
  this.options = options || Object.create(null);

  this.element = this.options.element || document.createElement('div');
}
var p = View.prototype;

/**
 * Render the view to the DOM, using the model data.
 */
p.render = function(){

}