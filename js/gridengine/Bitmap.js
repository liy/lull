
function Bitmap(){
	DisplayObject.call(this);

	this.image = null;
	for(var i=0; i<4; ++i){
		this.vertices[i] = new Vec2();
	}
}
var p = Bitmap.prototype = Object.create(DisplayObject.prototype);

p.load = function(imageOrURL){
	// url
	if(typeof imageOrURL === 'string'){
		this.image = new Image();
		this.image.onload = bind(this, this.onload);
		this.image.src = imageOrURL;
	}
	else{
		this.image = imageOrURL;

		if(!this.image.complete)
			this.image.onload = bind(this, this.onload);
		else
			this.onload();
	}
};

p.onload = function(){
	this.vertices[0].zero();
	this.vertices[1].setValues(0, this.image.height);
	this.vertices[2].setValues(this.image.width, this.image.height);
	this.vertices[3].setValues(this.image.width, 0);

	this.dispatchEvent(new Event(Event.COMPLETE));
};

p.updateContext = function(context){
	// update matrix, getting ready for apply to the context.
  this.updateMatrix();
  // push the current matrix state to the stack
  context.save();
  context.globalAlpha = this._getGlobalAlpha();
  // 2d affine transform
  context.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);
}

p.draw = function(context){
	if(!this.visible || this.image == null || !this.image.complete)
		return;

	DisplayObject.prototype.draw.call(this, context);

  context.drawImage(this.image, 0, 0);
};

p.postDraw = function(context){
	// pop the last saved matrix state, assign to the context.
  context.restore();
}

Object.defineProperty(p, "complete", {
	get: function(){
		return this.image.complete;
	}
});


Object.defineProperty(p, "width", {
	// note that if you have to define getter and setter both of them at the same time for overriding!
	get: function(){
		this.computeAABB();
		return this._aabb.width;
	},
	set: function(v){
		this._scaleX = v/this.image.width;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "height", {
	// note that if you have to define getter and setter both of them at the same time for overriding!
	get: function(){
		this.computeAABB();
		return this._aabb.width;
	},
	set: function(v){
		this._scaleY = v/this.image.height;

		this.dirtyMatrix = true;
	}
});