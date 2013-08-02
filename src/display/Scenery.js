function Scenery(){
  this.name = "Scenery";
}
var p = Scenery.prototype;

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