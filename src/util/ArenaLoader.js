function ArenaLoader(){
  this.tasks = [];
}
var p = ArenaLoader.prototype;

p.clear = function(){
  this.tasks = [];
}

p.push = function(path){
  var task = new ArenaLoadTask(this);
  this.tasks.push(task)

  return task;
}

p.load = function(){
  var task = this.tasks.pop();

  if(task) task.process(this._next);
}

p._next = function(){

  this.load();
}

p.onComplete = function(){

}