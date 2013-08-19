function Container(){
	DisplayObject.call(this);

	this._children = [];
}
var p = Container.prototype = Object.create(DisplayObject.prototype)

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
  // draw graphics
	this.graphics.draw(context);

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		if(this.visible){
			this._children[i].updateContext(context);
			this._children[i].draw(context);
			this._children[i].postDraw(context);
		}
	}

	if(this.onDraw) 
		this.onDraw(context);
};

p.postDraw = function(context){
	// pop the last saved matrix state, assign to the context.
  context.restore();
}

Object.defineProperty(p, "numChildren", {
	get: function(){
		return this._children.length;
	}
});

p.addChild = function(displayObject){
	// first we need to remove it from its old Container.
	if(displayObject.parent != null){
		displayObject.parent.removeChild(displayObject);
	}

	// Add the DisplayObject to this Container's children list.
	displayObject.parent = this;
	this._children.push(displayObject);

	this.dirtyAABB = true;
};

p.removeChild = function(displayObject){
	this.removeChildAt(this._children.indexOf(displayObject));
};

p.removeChildAt = function(index){
	if(index < 0 || index > this._children.length-1)
		return null;

	// mark all its parent container dirty first before it is removed.
	this.dirtyAABB = true;

	var removed = this._children[index];
	// delete this._children[index];
	this._children.splice(index, 1);
	removed.parent = null;

	// it is now off the stage.
	removed.setStage(null);

	return removed;
};

p.getChildAt = function(index){
	if(index < 0 || index > this._children.length-1)
		return null;

	return this._children[index];
};

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

p.getAABB = function(){
	// reset AABB so it is ready for perform merging.
	this._aabb.reset();

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		this._aabb.merge(this._children[i].getAABB(), this._children[i].matrix);
	}

	// TODO: merge graphics vertices.
	this.graphics.merge(this._aabb);

	return this._aabb;
};