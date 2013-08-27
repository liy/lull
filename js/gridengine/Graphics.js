function GraphicsCommand(func, params){
  this.func = func;
  this.params = params;
}


// TODO: merge Graphics and Graphics class.
function Graphics(){
  DisplayObject.call(this);

  this._commands = [];

  this.vertices = [];
}
var p = Graphics.prototype = Object.create(DisplayObject.prototype);

p.draw = function(context){
  if(!this.visible)
    return;

  DisplayObject.prototype.draw.call(this, context);

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

// Merge AABB with graphics' vertices.
// p.merge = function(aabb){
//   var lowerBound, upperBound;
//   var len = this.vertices.length;

//   if(len > 0){
//     upperBound = lowerBound = this.vertices[0];

//     for(var i=1; i<this.vertices.length; ++i){
//       lowerBound = Vec2.min(lowerBound, this.vertices[i]);
//       upperBound = Vec2.max(upperBound, this.vertices[i]);
//     }


//     aabb.lowerBound = Vec2.min(aabb.lowerBound, lowerBound);
//     aabb.upperBound = Vec2.max(aabb.upperBound, upperBound);

//     aabb.vertices[0].set(aabb.lowerBound.x, aabb.lowerBound.y);
//     aabb.vertices[1].set(aabb.lowerBound.x, aabb.upperBound.y);
//     aabb.vertices[2].set(aabb.upperBound.x, aabb.upperBound.y);
//     aabb.vertices[3].set(aabb.upperBound.x, aabb.lowerBound.y);
//   }
// };

p.computeAABB = function(){
  // reset AABB so it is ready for perform merging.
  this._aabb.reset();

  // directly update AABB using graphics information
  var lowerBound, upperBound;
  var len = this.vertices.length;

  if(len > 0){
    upperBound = lowerBound = this.vertices[0];

    for(var i=1; i<this.vertices.length; ++i){
      lowerBound = Vec2.min(lowerBound, this.vertices[i]);
      upperBound = Vec2.max(upperBound, this.vertices[i]);
    }

    this._aabb.lowerBound.setValue(lowerBound);
    this._aabb.upperBound.setValue(upperBound);

    this._aabb.vertices[0].setValues(lowerBound.x, lowerBound.y);
    this._aabb.vertices[1].setValues(lowerBound.x, upperBound.y);
    this._aabb.vertices[2].setValues(upperBound.x, upperBound.y);
    this._aabb.vertices[3].setValues(upperBound.x, lowerBound.y);
  }

  return this._aabb;
};