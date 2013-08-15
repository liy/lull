function GraphicsCommand(name, params){
  this.name = name;
  this.params = params;
}

function Graphics(){
  this._commands = [];
}
var p = Graphics.prototype = Object.create(Node.prototype);

p.draw = function(renderer){
  renderer.predraw(this);
  renderer.drawGraphics(this);
  renderer.postdraw(this);
}

p.clear = function(){
  this._commands.length = 0;
}

p.beginFill = function(color, alpha){
  this._commands.push(new GraphicsCommand("beginFill", arguments));
}

p.drawRect = function(x, y, w, h){
  this._commands.push(new GraphicsCommand("drawRect", arguments));
}

p.drawCircle = function(x, y, radius){
  this._commands.push(new GraphicsCommand("drawCircle", arguments));
}

p.endFill = function(){
  this._commands.push(new GraphicsCommand("endFill", arguments));
}