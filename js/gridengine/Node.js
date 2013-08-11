function Node(){
  EventDispatcher.call(this);

  this.id = Node._id++;
}
var p = Node.prototype = Object.create(EventDispatcher.prototype);

p.draw = function(context){
  console.log('draw');
}

Node._id = 0;