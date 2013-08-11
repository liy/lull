function ImageMediator(model, options){
  Mediator.call(this, model, options);

  this.image = new Image();
  this.image.onload = bind(this, this.onload);
}
var p = ImageMediator.prototype = Object.create(Mediator.prototype);

p.load = function(url){
  if(url)
    this.set({attribute: url});

  this.image.src = url;
}

p.onload = function(evt){

  this.dispatchEvent(new Event(Event.COMPLETE));
}