/**
* Abstract class
*/
function DisplayObject(){
	Node.call(this);

	this.graphics = new Graphics();

	this._stage = null;
	this.visible = true;

	this.parent = null;

	this._x = 0;
	this._y = 0;

	this._radian = 0;

	this._scaleX = 1;
	this._scaleY = 1;

	/**
	 * 1. child added removed
	 * 2. child size changed
	 * 3. child position moved
	 */
	this.aabb = new AABB();

	// 2d affine transform matrix, internal use only.
	this._m = new Mat3();

	this._anchorX = 0;
	this._anchorY = 0;

	this.alpha = 1;

	// callback function after DisplayObject context drawing process finished.
	this.onDraw = null;
}
var p = DisplayObject.prototype = Object.create(Node.prototype);

/*
Update the transform matrix of the DisplayObject. The process will only perform when the matrix is dirty, in other word, the position, scale, rotation and anchor offset,
any of them change, the matrix will be marked dirty, matrix will be updated when the method is called.
Note that, children's matrix changes DOES affect or propagate up through their ancestor's matrix. Also, if this DisplayObject is a Container, add or remove child
DOES NOT affect the matrix of the Container.
*/
p.updateMatrix = function(){
	this._m.identity();

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
};

p.draw = function(context){
	// needs implementation
};

p.hitTest = function(x, y){
	return HitTest.process(this, x, y);
}

/*
The matrix of the DisplayObject.
*/
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
	}
});

/*
Concatenate all its parents matrix into one. This matrix can be used for producing local to global position.
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

/*
X position of the DisplayObject.
*/
Object.defineProperty(p, "x", {
	get: function(){
		return this._x;
	},
	set: function(x){
		this._x = x;
	}
});

/*
Y position of the DisplayObject.
*/
Object.defineProperty(p, "y", {
	get: function(){
		return this._y;
	},
	set: function(y){
		this._y = y;
	}
});

/*
The radian of the DisplayObject.
*/
Object.defineProperty(p, "radian", {
	get: function(){
		return this._radian;
	},
	set: function(radian){
		this._radian = radian;
	}
});

/*
The registration point X of the DisplayObject
*/
Object.defineProperty(p, "anchorX", {
	get: function(){
		return this._anchorX;
	},
	set: function(x){
		this._anchorX = x;
	}
});

/*
The registration point Y of the DisplayObject.
*/
Object.defineProperty(p, "anchorY", {
	get: function(){
		return this._anchorY;
	},
	set: function(y){
		this._anchorY = y;
	}
});

/*
Transform the global coordinate vector into the local coordinate system.
For example, position a DisplayObject to where user click, but also into a scaled, rotated and translated Container. The mouse position must
be transformed use this method: container.globalToLocal(mousePosition).
*/
p.globalToLocal = function(v){
	var invert = this.concatedMatrix.invert();
  return invert.transform(v);
};

/*
This perform an opposite action as globalToLocal method. It produce a 'global' position from the 'local' position.
*/
p.localToGlobal = function(v){
	return this.concatedMatrix.transform(v);
};

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






/*
X scale of the DisplayObject.
*/
Object.defineProperty(p, "scaleX", {
	get: function(){
		return this._scaleX;
	},
	set: function(s){
		this._scaleX = s;
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
	}
});

Object.defineProperty(p, "width", {
	get: function(){
		if(this.aabb.width === Number.NEGATIVE_INFINITY)
			return 0;
		else
			return this.aabb.width * this._scaleX;
	},
	set: function(v){
		// console.log(this.aabb.width);
		this._scaleX = v/this.aabb.width;
	}
});

Object.defineProperty(p, "height", {
	get: function(){
		if(this.aabb.height === Number.NEGATIVE_INFINITY)
			return 0;
		else
			return this.aabb.height * this._scaleY;
	},
	set: function(v){
		this._scaleY = v/this.aabb.height;
	}
});

p.getBounds = function(targetCoordinateSpace){
	var m = this.matrix.clone();
	var target = this.parent;
	while(target != targetCoordinateSpace && target != null)
		m.multiplyLeft(target.matrix);
}

p._updateAABB = function(){
	// needs implementation.
}
