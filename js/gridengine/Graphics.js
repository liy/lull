function GraphicsCommand(func, params){
  this.func = func;
  this.params = params;
}

function Graphics(){
  this._commands = [];
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
}

p.beginFill = function(color, alpha){
  this._commands.push(new GraphicsCommand(this._beginFill, arguments));
}

p._beginFill = function(color, alpha){
  // note this should refer to a canvas context
  this.globalAlpha *= alpha;
  this.fillStyle = color;
  this.beginPath();
}

p.drawRect = function(x, y, w, h){
  this._commands.push(new GraphicsCommand(this._drawRect, arguments));
}

p._drawRect = function(x, y, w, h){
  this.rect(x, y, w, h);
  this.fill();
}

p.drawCircle = function(x, y, radius){
  this._commands.push(new GraphicsCommand(this._drawCircle, arguments));
}

p.endFill = function(){
  this._commands.push(new GraphicsCommand(this._endFill, arguments));
}

p._endFill = function(){
  this.closePath();
}
