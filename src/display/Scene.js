function Scene(){
  this.name = "scene";
}
var p = Scene.prototype;

p.load = function(){

}

p.onload = function(){

}

p.update = function(){
  console.log('updating: ' + this.name);
}

p.render = function(){
  console.log('rendering: ' + this.name);
}