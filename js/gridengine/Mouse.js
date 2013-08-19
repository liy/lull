function Mouse(renderer){
  this.renderer = renderer;

  this._mouseDownTarget = null;
  this._mouseUpTarget = null;
  this._stack = [];

  renderer.canvas.addEventListener('click', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousedown', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mouseup', bind(this, this.handler), false);
}
var p = Mouse.prototype;

p.handler = function(e){
  var x = e.x - this.renderer.canvas.offsetLeft;
  var y = e.y - this.renderer.canvas.offsetTop;

  // console.log(x, y)

  this._stack.length = 0;

  this.traverse(e.type, this.renderer.stage, x, y);

  // for(var i=0; i<this._stack.length; ++i){

  // }
  console.log(this._stack);
}

p.traverse = function(type, node, x, y){
  var hit = HitTest.process(node, x, y);
  if(hit)
    this._stack.push(node);

  // if(node instanceof Bitmap){
  //   console.log(node, hit);
  // }

  if(node instanceof Container){
    var len = node.numChildren;
    for(var i=0; i<len; ++i){
      this.traverse(type, node.getChildAt(i), x, y);
    }
  }
}