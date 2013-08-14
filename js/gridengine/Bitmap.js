
function Bitmap(){
	DisplayObject.call(this);

	this.image = null;

	// the rectangle object define the area of the object, e.g., the image width and height
	this._rect = new Rect();
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
	console.log('bitmap loaded complete');
	this._rect.width = this.image.width;
	this._rect.height = this.image.height;

	this._aabb.reset(this._rect);

	this.dispatchEvent(new Event(Event.COMPLETE));
};

p.draw = function(renderer){
	if(!this.visible || this.image == null || !this.image.complete)
		return;

	renderer.predraw(this);
	renderer.draw(this.image, 0, 0);
	renderer.postdraw(this);
};

/*
Calculate and return the AABB of the Bitmap instance.
*/
Object.defineProperty(p, "aabb", {
	get: function(){
		if(this._aabb.isDirty){
			this._aabb.reset(this._rect);
			// compute AABB, according to the matrix of the this Bitmap instance.
			this._aabb.transform(this.matrix);

			this.dirtyAABB = false;

			if(this.name == "bmp")
				console.log("perform Bitmap AABB transform");
		}
		// return the clone of the aabb.
		return this._aabb;
	}
});

/*
Getter and setter
*/
Object.defineProperty(p, "complete", {
	get: function(){
		return this.image.complete;
	}
});