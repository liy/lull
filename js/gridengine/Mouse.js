function Mouse(renderer){
  this.renderer = renderer;

  this._mouseDownTarget = null;
  this._mouseUpTarget = null;
  this._stack = [];

  renderer.canvas.addEventListener('click', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousemove', bind(this, this.handler), false);
  renderer.canvas.addEventListener('mousedown', bind(this, this.handler), false);
  renderer.canvas.addEventListener('mouseup', bind(this, this.handler), false);
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
Mouse.click = new Event('click');
Mouse.mousedown = new Event('mousedown');
Mouse.mouseenter = new Event('mouseenter');
Mouse.mouseleave = new Event('mouseleave');
Mouse.mousemove = new Event('mousemove');
Mouse.mouseout = new Event('mouseout');
Mouse.mouseover = new Event('mouseover');
Mouse.mouseup = new Event('mouseup');

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
  this._stack.length = 0;
  this.traverse(e.type, this.renderer.stage, x, y);

  // dispatch event from the objects that under the mouse position.
  for(var i=0; i<this._stack.length; ++i){
    Mouse[e.type].targets = this._stack;
    Mouse[e.type].x = x;
    Mouse[e.type].y = y;
    this._stack[i].dispatchEvent(Mouse[e.type]);
  }
}

p.traverse = function(type, node, x, y){
  var hit = HitTest.process(node, x, y);
  if(hit)
    this._stack.push(node);

  if(node instanceof Container){
    var len = node.numChildren;
    for(var i=0; i<len; ++i){
      this.traverse(type, node.getChildAt(i), x, y);
    }
  }
}