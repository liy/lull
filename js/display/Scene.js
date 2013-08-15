// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(){
  Container.call(this);

  this.scenery = null;
  this.nodes = [];

  this.width = 1024;
  this.height = 768;

  // this.thumbnail = new Bitmap();
  // this.addChild(this.thumbnail);

  // this.container = new Container();
  // this.addChild(this.container);
}
var p = Scene.prototype = Object.create(Container.prototype);