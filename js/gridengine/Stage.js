function Stage(renderer){
  Container.call(this)

  this.renderer = renderer;

  this.camera = null;

  this._stage = this;
}
var p = Stage.prototype = Object.create(Container.prototype);