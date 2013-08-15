function CanvasRenderer(width, height, container){
  Renderer.call(this);

  this.clearColor = 0xFFF;

  this.canvas = document.createElement('canvas');
  this.canvas.width = width || 640;
  this.canvas.height = height || 480;
  var canvasContainer = container || document.getElementsByTagName('body')[0];
  canvasContainer.appendChild(this.canvas);

  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = '#' + this.clearColor.toString(16);

  this.stage = new Stage(this);

  this.render();
}
var p = CanvasRenderer.prototype = Object.create(Renderer.prototype);

p.render = function(delta){
  this.stage.update();

  // draw stage
  // reset to identity matrix transform
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.fillStyle = '#' + this.clearColor.toString(16);
  // clear the screen
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // reset identity
  this.stage._m.identity();
  // transform according to camera matrix
  if(this.stage.camera != null){
    this.stage.camera.update();
    var m = this.stage.camera.matrix;
    this.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
  }
  var len = this.stage._children.length;
  for(var i=0; i<len; ++i){
    this.stage._children[i].draw(this);
  }
}

p.predraw = function(node){
  // update matrix, getting ready for apply to the context.
  node.updateMatrix();

  // push the current matrix state to the stack
  this.context.save();

  this.context.globalAlpha *= node.alpha;

  // 2d affine transform
  this.context.transform(node._m.a,  node._m.b, node._m.c, node._m.d, node._m.tx+0.5|0, node._m.ty+0.5|0);
  // ctx.transform(node._m.a, node._m.b, node._m.c, node._m.d, node._m.tx, node._m.ty);
  // ctx.drawImage(node.image, node._rect.x, node._rect.y, node._rect.width, node._rect.height, 0, 0, node._rect.width, node._rect.height);
}

/**
 * Draw the DisplayObject.
 * @param  {Image} image    Specifiy the image to draw
 * @param  {Number} sx      The x coordinate where to start clipping
 * @param  {Number} sy      The y coordinate where to start clipping
 * @param  {Number} swidth  Optional. The width of the clipped image
 * @param  {Number} sheight Optional. The height of the clipped image
 * @param  {Number} x       Optional. The x coordinate where to place the image on the canvas
 * @param  {Number} y       Optional. The y coordinate where to place the image on the canvas
 * @param  {Number} width   Optional. The width of the image to use (stretch or reduce the image)
 * @param  {Number} height  Optional. The height of the image to use (stretch or reduce the image)
 */
p.draw = function(image, sx, sy, swidth, sheight, x, y, width, height){
  this.context.drawImage.apply(this.context, arguments);
}

p.drawGraphics = function(graphics){
  for(var i=0; i<graphics._commands.length; ++i){
    var command = graphics._commands[i];
    this[command.name].apply(this, command.params);
  }
}

p.postdraw = function(){
  // pop the last saved matrix state, assign to the context.
  this.context.restore();
}

p.beginFill = function(color, alpha){
  this.context.fillStyle = '#' + color.toString(16);
  this.context.beginPath();
}

p.drawRect = function(x, y, w, h){
  this.context.rect(x, y, w, h);
}

p.endFill = function(){
  this.context.fill();
}