/**
 * Abstract class
 */
function DisplayObject(){
	Node.call(this);

	this._stage = null;

	this.visible = true;

	this.mouseEnabled = true;

	this.parent = null;

	this._x = 0;
	this._y = 0;

	this._radian = 0;

	this._scaleX = 1;
	this._scaleY = 1;

	this._aabb = new AABB();
	// 0------3
	// |      |
	// 1------2
	this.vertices = [];

	// 2d affine transform matrix, internal use only.
	this._m = new Mat3();

	this._anchorX = 0;
	this._anchorY = 0;

	this.alpha = 1;


	// Whether the local transform matrix is dirty or not. If it is clean, updateMatrix() method will do nothing in order to reduce computation cost.
	this.dirtyMatrix = true;
}
var p = DisplayObject.prototype = Object.create(Node.prototype);

/*
Update the transform matrix of the DisplayObject. The process will only perform when the matrix is dirty, in other word, the position, scale, rotation and anchor offset,
any of them change, the matrix will be marked dirty, matrix will be updated when the method is called.
Note that, children's matrix changes DOES affect or propagate up through their ancestor's matrix. Also, if this DisplayObject is a Container, add or remove child
DOES NOT affect the matrix of the Container.
*/
p.updateMatrix = function(){
	if(this.dirtyMatrix){
		this._m.identity();

		// console.log('update matrix');

		// Notice that these convinient methods act like generating corresponding transform matrix.
		// The new matrix will be multiply to the current matrix:
		//		this._m = newMatrix * this._m.
		// Which means, the matrix gernerated by earlier methods will be applied first, the latter matrix will be applied later.
		// Therefore, the transform sequence shoud be:
		//		anchor translate  ->  scale  -> rotate  ->  position translate.
		this._m.translate(-this.anchorX, -this.anchorY);//anchor translation transform
		this._m.scale(this._scaleX, this._scaleY);// scale transform
		this._m.rotate(this._radian);//rotation transform
		this._m.translate(this._x, this._y);//normal position translation transform

		this.dirtyMatrix = false;
	}
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
	this.dispatchEvent(Event.enterframe);
};

p.postDraw = function(context){
	// pop the last saved matrix state, assign to the context.
  context.restore();
}

p.hitTest = function(x, y){
	return HitTest.process(this, x, y);
}

Object.defineProperty(p, "matrix", {
	get: function(){
		// ensure the matrix is up to date.
		this.updateMatrix();
		return this._m;
	},
	// TODO: needs further improvement
	set: function(m){
		this._m = m;

		/**
		* Naive decompose process.
		*
		*	We assume the matrix will only contains 2D affine transformation, and only an extra Z translation, for now, ignore the translation elements
		*		| cos(r)*scaleX    -sin(r)*skewX	0  |
		*		| sin(r)*skewY		cos(r)*scaleY	0  |
		*		| 0					0				1  |
		*
		*	If we apply this matrix to a point at (1.0f, 0.0f)
		*		x' = cos(r) * scaleX
		*		y' = sin(r) * skewY
		*
		*	The rotation then will be:
		*		atan2f(x', y')
		*	===>>
		*		_rotation = atan2f(_transform[1], _transform[0])
		*
		*
		*	Also the scale will be:
		*		scaleX = _transform[0] / cos(r)
		*		scaleY = _transform[5] / cos(r)
		*/
		this.radian = Math.atan2(this._m.b, this._m.a);

		var cos = Math.cos(this.radian);
		this._scaleX = this._m.a/cos;
		this._scaleY = this._m.d/cos;

		this._x = this._m.tx - this._anchorX;
		this._y = this._m.ty - this._anchorY;

		this.dirtyMatrix = true;
	}
});

/**
 * Concatenate all its parents matrix into one. This matrix can be used for producing local to global position.
 */
Object.defineProperty(p, "concatedMatrix", {
	get: function(){
		// just in case the matrix applied to this object is dirty.
		this.updateMatrix();

		// TODO: Might want to cache concatenation matrix.
		var m = new Mat3(this._m.a, this._m.b, this._m.c, this._m.d, this._m.tx, this._m.ty);

		// If parent is not null, concatenate the current matrix and return it:
		// currentMatrix * parentConcatedMatrix
		if(this.parent != null)
			return m.multiplyLeft(this.parent.concatedMatrix);
		else
			return m;
	}
});

Object.defineProperty(p, "x", {
	get: function(){
		return this._x;
	},
	set: function(x){
		this._x = x;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "y", {
	get: function(){
		return this._y;
	},
	set: function(y){
		this._y = y;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "radian", {
	get: function(){
		return this._radian;
	},
	set: function(radian){
		this._radian = radian;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "anchorX", {
	get: function(){
		return this._anchorX;
	},
	set: function(x){
		this._anchorX = x;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "anchorY", {
	get: function(){
		return this._anchorY;
	},
	set: function(y){
		this._anchorY = y;

		this.dirtyMatrix = true;
	}
});


/**
 * Recursively get the real alpha value. When draw the DisplayObject, its real alpha depends on its parent's alpha.
 * @return {Number} Real alpha for drawing the DisplayObject.
 */
p._getGlobalAlpha = function(){
	var alpha = this.alpha;
	if(this.parent)
		alpha *= this.parent._getGlobalAlpha();
	return alpha;
}

/**
 * Transform the global coordinate vector into the local coordinate system.
 * For example, position a DisplayObject to where user click, but also into a scaled, rotated and translated Container. The mouse position must
 * be transformed use this method: container.globalToLocal(mousePosition).
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
p.globalToLocal = function(v){
	var invert = this.concatedMatrix.invert();
  return invert.transform(v);
};

/**
 * This perform an opposite action as globalToLocal method. It produce a 'global' position from the 'local' position.
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
p.localToGlobal = function(v){
	return this.concatedMatrix.transform(v);
};

// TODO: make it normal method
Object.defineProperty(p, "stage", {
	get: function(){
		return this._stage;
	},
	// private method, internal use only
	// When the DisplayObject is removed from the display list, its stage will be nulled.
	set: function(value){
		this._stage = value;
	}
});

/*
X scale of the DisplayObject.
*/
Object.defineProperty(p, "scaleX", {
	get: function(){
		return this._scaleX;
	},
	set: function(s){
		this._scaleX = s;

		this.dirtyMatrix = true;
	}
});

/*
Y scale of the DisplayObject.
*/
Object.defineProperty(p, "scaleY", {
	get: function(){
		return this._scaleY;
	},
	set: function(s){
		this._scaleY = s;

		this.dirtyMatrix = true;
	}
});

p.getTransformedVertices = function(matrix){
	var len = this.vertices.length;
	var vs = new Array(len);
	for(var i=0; i<len; ++i){
		vs[i] = matrix.transformNew(this.vertices[i]);
	}

	return vs;
}

p.computeAABB = function(){
	var tfVertices = this.getTransformedVertices(this.matrix);

	var lowerBound = tfVertices[0];
	var upperBound = lowerBound;

	var len = tfVertices.length;
	for(var i=1; i<len; ++i){
		lowerBound = Vec2.min(lowerBound, tfVertices[i]);
		upperBound = Vec2.max(upperBound, tfVertices[i]);
	}
	this._aabb.lowerBound.setValue(lowerBound);
	this._aabb.upperBound.setValue(upperBound);

	return this._aabb;
}

Object.defineProperty(p, "width", {
	get: function(){
		return this.computeAABB().width;
	},
	set: function(v){
		this._scaleX = v/this.computeAABB().width;

		this.dirtyMatrix = true;
	}
});

Object.defineProperty(p, "height", {
	get: function(){
		return this.computeAABB().height;
	},
	set: function(v){
		this._scaleY = v/this.computeAABB().height;

		this.dirtyMatrix = true;
	}
});

p.getBounds = function(targetCoordinateSpace){
	var m = new Mat3();
	var target = this;
	while(target != targetCoordinateSpace){
		m = m.multiplyLeft(target.matrix);
		target = target.parent;
	}

	var tfVertices = this.getTransformedVertices(m);
	var lowerBound = tfVertices[0];
	var upperBound = lowerBound;

	var len = tfVertices.length;
	for(var i=1; i<len; ++i){
		lowerBound = Vec2.min(lowerBound, tfVertices[i]);
		upperBound = Vec2.max(upperBound, tfVertices[i]);
	}

	return new Rect(lowerBound.x, lowerBound.y, upperBound.x - lowerBound.x, upperBound.y - lowerBound.y);
}