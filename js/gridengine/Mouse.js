function Mouse(renderer){
  this.renderer = renderer;

  this._mouseDownTarget = null;
  this._mouseUpTarget = null;

  renderer.canvas.addEventListener('click', bind(this, this.clickHandler), false);
  // renderer.canvas.addEventListener('mousemove', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousedown', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mouseup', bind(this, this.handler), false);
  this._position = new Vec2();
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

p.clickHandler = function(e){
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
  var target = this.renderer.stage.getObjectUnder(x, y);

  console.log(target.name);

  if(target){
    var local = target.globalToLocal(new Vec2(x, y));
    target.dispatchEvent(new MouseEvent(e.type, true, x, y, local.x, local.y));
  }
}