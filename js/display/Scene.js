// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(){
  Container.call(this);

  this.scenery = null;

  this.targetWidth = 640/4;
  this.targetHeight = 480/4;
}
var p = Scene.prototype;


p.zoomOut = function(){

}