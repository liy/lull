function AABB(){
	this.lowerBound = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	this.upperBound = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
var p = AABB.prototype;

/*

*/
p.reset = function(){
	this.lowerBound.setValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	this.upperBound.setValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};

/*

*/
p.clone = function(){
	var aabb = new AABB();
	aabb.lowerBound = this.lowerBound.clone();
	aabb.upperBound = this.upperBound.clone();

	return aabb;
};

Object.defineProperty(p, 'width', {
	get: function(){
		return this.upperBound.x - this.lowerBound.x;
	}
});

Object.defineProperty(p, 'height', {
	get: function(){
		return this.upperBound.y - this.lowerBound.y;
	}
});

p.set = function(x, y, w, h){
	this.lowerBound.x = x;
	this.lowerBound.y = y;
	this.upperBound.x = x + w;
	this.upperBound.y = y + h;
}

p.toString = function(){
	return '['+this.lowerBound.x + ', ' + this.lowerBound.y + ', ' + this.upperBound.x + ', ' + this.upperBound.y+']'
}