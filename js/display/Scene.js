// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(){
  Container.call(this);

  this.scenery = null;
  this.nodes = [];

  this.width = 1024;
  this.height = 768;

  this.element = document.createElement('div');
  this.element.setAttribute('class', 'Scene');
  document.getElementsByTagName('body')[0].appendChild(this.element);
}
var p = Scene.prototype = Object.create(Container.prototype);