function Mouse(renderer){
  this.renderer = renderer;

  this._mouseDownTarget = null;
  this._mouseUpTarget = null;

  renderer.canvas.addEventListener('click', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousemove', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousedown', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mouseup', bind(this, this.handler), false);
}
var p = Mouse.prototype;

/**
 * mousedown  MouseEvent  DOM L3  A pointing device button (usually a mouse) is pressed on an element.
 * mouseenter   MouseEvent  DOM L3  A pointing device is moved onto the element that has the listener attached.
 * mouseleave   MouseEvent  DOM L3  A pointing device is moved off the element that has the listener attached.
 * mousemove   MouseEvent  DOM L3  A pointing device is moved over an element.
 * mouseout   MouseEvent  DOM L3  A pointing device is moved off the element that has the listener attached or off one of its children.
 * mouseover   MouseEvent  DOM L3  A pointing device is moved onto the element that has the listener attached or onto one of its children.
 * mouseup   MouseEvent  DOM L3  A pointing device button is released over an element.
 */

p.handler = function(e){
  // Get the mouse position.
  var x,y;
  if (e.pageX || e.pageY){
    x = e.pageX;
    y = e.pageY;
  }
  else{
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= this.renderer.canvas.offsetLeft;
  y -= this.renderer.canvas.offsetTop;

  // reset the array, getting ready to store object under the mouse position.
  var hitNode;
  this.traverse(hitNode, e.type, this.renderer.stage, x, y);

  if(target){
    var local = target.globalToLocal(new Vec2(x, y));
    target.dispatchEvent(new MouseEvent(e.type, true, x, y, local.x, local.y));
  }
}

p.traverse = function(type, node, x, y){
  var isContainer = node instanceof Container;

  var hit = HitTest.process(node, x, y);
  if(hit){
    hitNode = node;
    if(!isContainer)
      return hitNode;
  }

  if(isContainer){
    var len = node.numChildren;
    for(var i=0; i<len; ++i){
      this.traverse(type, node.getChildAt(i), x, y);
    }
  }
  else{
    
  }
}