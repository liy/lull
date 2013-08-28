function Container(){
	DisplayObject.call(this);

	this._children = [];
}
var p = Container.prototype = Object.create(DisplayObject.prototype)

p.draw = function(context){
	if(!this.visible)
    return;

  DisplayObject.prototype.draw.call(this, context);

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		this._children[i].updateContext(context);
		this._children[i].draw(context);
		this._children[i].postDraw(context);
	}
};

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

	displayObject.stage = this.stage;

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
	removed.stage = null;

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

// TODO: make it normal method
Object.defineProperty(p, "stage", {
	get: function(){
		return this._stage;
	},
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

p.getTransformedVertices = function(matrix){
	this.vertices.length = 0;

	var vertices = [];

	var len = this._children.length;
	for(var i=0; i<len; ++i){
		var child = this._children[i];
		var m = matrix.clone().multiplyRight(child.matrix);
		var tv = child.getTransformedVertices(m);
		vertices = vertices.concat(tv);
	}

	return vertices;
}

/**
 * [getObjectUnder description]
 * @param  {[type]} x Global x coordinate
 * @param  {[type]} y Global y coordinate
 * @return {[type]}   The hit DisplayObject
 */
p.getObjectUnder = function(x, y){
	var len = this.numChildren;
	for(var i=len-1; i>=0; --i){
		var child = this.getChildAt(i);

		if(!child.mouseEnabled || !child.visible)
			continue;

		if(child instanceof Container && !child.hitArea){
			var result = child.getObjectUnder(x, y);
			if(result)
				return result;
		}
		else{
			// hit
			if(HitTest.process(child, x, y))
				return child;
		}
	}
}