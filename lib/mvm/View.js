function View(mediator, options){
  this.mediator = mediator;
  this.options = options;

  if(mediator)
    mediator._registerView(this);
}
var p = View.prototype;

p.setMediator = function(mediator){
  if(mediator){
    this.mediator._unregisterView(this);
    this.mediator = mediator;
    this.mediator._registerView(this);
  }
}

/**
 * Render the view to the DOM, using the model data.
 */
p.render = function(){

}