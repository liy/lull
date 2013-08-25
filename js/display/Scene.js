// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  var background = new Shape();
  background.graphics.beginFill('#FFF', 1);
  background.graphics.drawRect(0,0,w,h);
  background.graphics.endFill();
  this.addChild(background);
}
var p = Scene.prototype = Object.create(Container.prototype);