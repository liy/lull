// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  // this.graphics.beginFill('#FFF', 1);
  // this.graphics.drawRect(0, 0, w, h);
  // this.graphics.endFill();

  // if(Math.random() < 0.3){
    var bmp = new Bitmap();
    bmp.load('somacruz.png');
    this.addChild(bmp);
    // bmp.scaleX = bmp.scaleY = 0.4;
  // }
}
var p = Scene.prototype = Object.create(Container.prototype);