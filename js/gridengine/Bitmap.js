
function Bitmap(){
	DisplayObject.call(this);

	this.image = null;
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
	this._updateAABB();

	this.dispatchEvent(new Event(Event.COMPLETE));
};

p.draw = function(context){
	if(!this.visible || this.image == null || !this.image.complete)
		return;

	// update matrix, getting ready for apply to the context.
  this.updateMatrix();
  // push the current matrix state to the stack
  context.save();
  context.globalAlpha = this._getGlobalAlpha();
  // 2d affine transform
  context.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);

  context.drawImage(this.image, 0, 0);

  if(this.onDraw) this.onDraw(context);

	// pop the last saved matrix state, assign to the context.
  context.restore();
};

Object.defineProperty(p, "complete", {
	get: function(){
		return this.image.complete;
	}
});


Object.defineProperty(p, "width", {
	// note that if you have to define getter and setter both of them at the same time for overriding!
	get: function(){
		if(this.image.width === Number.NEGATIVE_INFINITY)
			return 0;
		else
			return this.image.width * this._scaleX;
	},
	set: function(v){
		this._scaleX = v/this.image.width;
	}
});

Object.defineProperty(p, "height", {
	// note that if you have to define getter and setter both of them at the same time for overriding!
	get: function(){
		if(this.image.height === Number.NEGATIVE_INFINITY)
			return 0;
		else
			return this.image.height * this._scaleY;
	},
	set: function(v){
		this._scaleY = v/this.image.height;
	}
});

p._updateAABB = function(){
	this.aabb.set(this.x, this.y, this.image.width, this.image.height)

	// update parent's aabb
	if(this.parent) this.parent._updateAABB();

	return this.aabb;
}