// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  var background = new Shape();
  background.graphics.beginFill('#FFF', 1);
  background.graphics.drawRect(0,0,w,h);
  background.graphics.endFill();
  this.addChild(background);

  this.addEventListener('mouseup', bind(this, this.onClick));
}
var p = Scene.prototype = Object.create(Container.prototype);

p.onClick = function(e){
  console.log(e.currentTarget.width);
  this.onDraw = this.zoomIn;
}

p.zoomIn = function(){
  // console.log('zoom in');
  var dw = (1024*0.8 - this.width)/20;
  var dh = (768*0.8 - this.height)/20;
  this.width += dw/5;
  this.height += dh/5;
}