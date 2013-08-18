function GraphicsCommand(func, params){
  this.func = func;
  this.params = params;
}

/**
 * FIXME: needs more work.
 * note that 'this' in the _xxx method should refer to a canvas context
 */
function Graphics(){
  this._commands = [];

  this.vertices = [];
}
var p = Graphics.prototype = Object.create(Node.prototype);

p.draw = function(context){
  for(var i=0; i<this._commands.length; ++i){
    var command = this._commands[i];
    command.func.apply(context, command.params);
  }
}

p.clear = function(){
  // clear this graphics equals to clear all the existing drawing command.
  // Note that it also reset the color and alpha etc.
  this._commands.length = 0;
  this.vertices.length = 0;
}

p.beginFill = function(color, alpha){
  this._commands.push(new GraphicsCommand(this._beginFill, arguments));
}

p._beginFill = function(color, alpha){
  this.globalAlpha *= alpha;
  this.fillStyle = color;
  this.beginPath();
}

p.drawRect = function(x, y, w, h){
  this._commands.push(new GraphicsCommand(this._drawRect, arguments));

  this.vertices.push(new Vec2(x, y));
  this.vertices.push(new Vec2(x+w, y+h));
}

p._drawRect = function(x, y, w, h){
  this.rect(x, y, w, h);
  this.fill();
}

p.drawCircle = function(x, y, radius){
  this._commands.push(new GraphicsCommand(this._drawCircle, arguments));

  this.vertices.push(new Vec2(x-radius, y-radius));
  this.vertices.push(new Vec2(x+radius, y+radius));
}

p.endFill = function(){
  this._commands.push(new GraphicsCommand(this._endFill, arguments));
}

p._endFill = function(){
  this.closePath();
}

p.merge = function(aabb){
  var lowerBound, upperBound;
  var len = this.vertices.length;

  if(len > 0){
    upperBound = lowerBound = this.vertices[0];

    for(var i=1; i<this.vertices.length; ++i){
      lowerBound = Vec2.min(lowerBound, this.vertices[i]);
      upperBound = Vec2.max(upperBound, this.vertices[i]);
    }

    // We only need to compare the cached bounds with the Container's corresponding bounds to calculate the new bounds.
    aabb.lowerBound = Vec2.min(aabb.lowerBound, lowerBound);
    aabb.upperBound = Vec2.max(aabb.upperBound, upperBound);

    // The vertices will be updated to match with the upper and lower bounds. Then, if the DisplayObject's Container can
    // use the vertices information to compute its own AABB.
    aabb.vertices[0].set(aabb.lowerBound.x, aabb.lowerBound.y);
    aabb.vertices[1].set(aabb.lowerBound.x, aabb.upperBound.y);
    aabb.vertices[2].set(aabb.upperBound.x, aabb.upperBound.y);
    aabb.vertices[3].set(aabb.upperBound.x, aabb.lowerBound.y);
  }
};
