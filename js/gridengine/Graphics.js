function GraphicsCommand(name, params){
  this.name = name;
  this.params = params;
}

function Graphics(){
  this._commands = [];
}
var p = Graphics.prototype = Object.create(Node.prototype);

p.draw = function(renderer){
  for(var i=0; i<this._commands.length; ++i){
    var command = this._commands[i];
    renderer[command.name].apply(renderer, command.params);
  }
}

p.clear = function(){
  // this._commands.length = 0;
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