// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(){
  Container.call(this);

  this.scenery = null;
  this.nodes = [];

  this.width = 1024;
  this.height = 768;

  this.drawFrame();
}
var p = Scene.prototype = Object.create(Container.prototype);

p.drawFrame = function(){
  this.graphics.beginFill('#000', 1);
  this.graphics.drawRect(0, 0, this.width, this.height);
  this.graphics.endFill();

  this.graphics.beginFill('#FFF', 1);
  this.graphics.drawRect(5, 5, this.width-10, this.height-10);
  this.graphics.endFill();
}