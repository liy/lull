function GraphicsCommand(name, params){
  this.name = name;
  this.params = params;
}

function Graphics(){
  this._commands = [];
}
var p = Graphics.prototype;

p.clear = function(){
  this._commands.length = 0;
}

p.beginFill = function(color, alpha){
  this._commands.push(new Command("beginFill", arguments));
}

p.drawRect = function(x, y, w, h){
  this._commands.push(new Command("drawRect", arguments));
}

p.drawCircle = function(x, y, radius){
  this._commands.push(new Command("drawCircle", arguments));
}