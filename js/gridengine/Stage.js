function Stage(renderer){
	Container.call(this)

	this.renderer = renderer;

	this.camera = null;
}
var p = Stage.prototype = Object.create(Container.prototype);