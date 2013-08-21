function Shape(){
  DisplayObject.call(this);

  this.graphics = new Graphics();
}
var p = Shape.prototype = Object.create(DisplayObject.prototype);

p.draw = function(context){
  // draw graphics
  this.graphics.draw(context);
}

p.getAABB = function(){
  // reset AABB so it is ready for perform merging.
  this._aabb.reset();

  // directly update AABB using graphics information
  this.graphics.updateAABB(this._aabb);

  return this._aabb;
};