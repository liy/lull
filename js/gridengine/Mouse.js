function Mouse(renderer){
  this.renderer = renderer;

  // mouse position vector.
  this.position = new Vec2();

  this._mouseDownTarget = null;
  this._mouseUpTarget = null;

  this.target = null;

  // renderer.canvas.addEventListener('click', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mousemove', bind(this, this.handler), false);
  renderer.canvas.addEventListener('mousedown', bind(this, this.handler), false);
  // renderer.canvas.addEventListener('mouseup', bind(this, this.handler), false);
}
var p = Mouse.prototype = Object.create(null);

/**
 * mousedown  MouseEvent  DOM L3  A pointing device button (usually a mouse) is pressed on an element.
 * mouseenter   MouseEvent  DOM L3  A pointing device is moved onto the element that has the listener attached.
 * mouseleave   MouseEvent  DOM L3  A pointing device is moved off the element that has the listener attached.
 * mousemove   MouseEvent  DOM L3  A pointing device is moved over an element.
 * mouseout   MouseEvent  DOM L3  A pointing device is moved off the element that has the listener attached or off one of its children.
 * mouseover   MouseEvent  DOM L3  A pointing device is moved onto the element that has the listener attached or onto one of its children.
 * mouseup   MouseEvent  DOM L3  A pointing device button is released over an element.
 */

/**
 * Update the mouse position
 * @param  {DOM MouseEvent} e DOM MouseEvent
 */
p._updatePostion = function(e){
  // Get the mouse position.
  if (e.pageX || e.pageY){
    this.position.x = e.pageX;
    this.position.y = e.pageY;
  }
  else{
    this.position.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    this.position.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  this.position.x -= this.renderer.canvas.offsetLeft;
  this.position.y -= this.renderer.canvas.offsetTop;
}

p.handler = function(e){
  this._updatePostion(e);

  var target = this.renderer.stage.getObjectUnder(this.position.x, this.position.y);

  // console.log(target);

  if(target){
    var local = target.globalToLocal(this.position);

    console.log('mouse action!');

    // click event
    if(e.type === 'mouseup' && this.target === target)
      target.dispatchEvent(new MouseEvent('click', true, this.position.x, this.position.y, local.x, local.y));

    // other mouse event.
    target.dispatchEvent(new MouseEvent(e.type, true, this.position.x, this.position.y, local.x, local.y));
  }

  this.target = target;
}