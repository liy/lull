function ArenaLoadTask(){

}
var p = AreanaLoadTask.prototype;

p.process = function(callback){
  this.callback = callback;
}

p._onComplete = function(){

  this.callback();
}