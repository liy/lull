function Stage(renderer){
	Container.call(this)

	this.renderer = renderer;
	this.canvas = renderer.canvas;
	this.context = this.canvas.getContext('2d');

	this.camera = null;
}
var p = Stage.prototype = Object.create(Container.prototype);

p.draw = function(){
	// reset to identity matrix transform
	this.context.setTransform(1, 0, 0, 1, 0, 0);
	// clear the screen
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// reset identity
	this._m.identity();

	// transform according to camera matrix
	if(this.camera != null){
		this.camera.update();
		var m = this.camera.matrix;
		this.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
	}

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		this._children[i].draw(this.renderer);
	}
};


p.clear = function(){
	this.context.save();
	this.context.setTransform(1, 0, 0, 1, 0, 0);
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.restore();
};