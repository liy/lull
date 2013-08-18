function Container(){
	DisplayObject.call(this);

	this._children = [];
}
var p = Container.prototype = Object.create(DisplayObject.prototype)

/*
Draw the Container onto the specific Canvas2D context.
*/
p.draw = function(context){
	if(!this.visible)
		return;

	// update matrix, getting ready for apply to the context.
  this.updateMatrix();
  // push the current matrix state to the stack
  context.save();
  context.globalAlpha = this._getGlobalAlpha();
  // 2d affine transform
  context.transform(this._m.a,  this._m.b, this._m.c, this._m.d, this._m.tx+0.5|0, this._m.ty+0.5|0);

  // draw graphics
	this.graphics.draw(context);

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		this._children[i].draw(context);
	}

	if(this.onDraw) this.onDraw(context);

	// pop the last saved matrix state, assign to the context.
  context.restore();
};

/*
Return the number of children in this Container
*/
Object.defineProperty(p, "numChildren", {
	get: function(){
		return this._children.length;
	}
});

/*
Add a DisplayObject into this Container.
*/
p.addChild = function(displayObject){
	// first we need to remove it from its old Container.
	if(displayObject.parent != null){
		displayObject.parent.removeChild(displayObject);
	}

	// Add the DisplayObject to this Container's children list.
	displayObject.parent = this;
	this._children.push(displayObject);

	this._updateAABB();
};

/*
Remove a DisplayObject from the Container.
*/
p.removeChild = function(displayObject){
	this.removeChildAt(this._children.indexOf(displayObject));
};

/*
Remove a DisplayObject indexed by the parameter. If index is out of bound, null is returned.
*/
p.removeChildAt = function(index){
	if(index < 0 || index > this._children.length-1)
		return null;

	var removed = this._children[index];
	// delete this._children[index];
	this._children.splice(index, 1);
	removed.parent = null;

	// it is now off the stage.
	removed.setStage(null);

	this._updateAABB();

	return removed;
};

/*

*/
p.getChildAt = function(index){
	if(index < 0 || index > this._children.length-1)
		return null;

	return this._children[index];
};

/*
Whether the Container contains the child.
*/
p.contains = function(displayObject){
	return this._children.indexOf(displayObject) != -1;
};

Object.defineProperty(p, "stage", {
	// private method, internal use only
	// When the DisplayObject is removed from the display list, its stage will be nulled.
	// All its children's stage will be nulled.
	set: function(value){
		this._stage = value;
		for(var i=0; i<this._children.length; ++i){
			this._children[i].stage = value;
		}
	}
});

p._updateAABB = function(){
	// reset AABB so it is ready for perform merging.
	this.aabb.reset();

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		this.aabb.merge(this._children[i].aabb, this._children[i].matrix);
	}

	console.log(this.aabb);

	// update parent's aabb
	if(this.parent) this.parent._updateAABB();

	return this.aabb;
}