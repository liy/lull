function CanvasRenderer(width, height, container){
  Renderer.call(this);

  this.canvas = document.createElement('canvas');
  this.canvas.width = width || 800;
  this.canvas.height = height || 800;

  var canvasContainer = container || document.getElementsByTagName('body')[0];
  canvasContainer.appendChild(this.canvas);

  this.stage = new Stage(this);

  this.render();
}
var p = CanvasRenderer.prototype = Object.create(Renderer.prototype);

p.render = function(){
  Renderer.prototype.render.call(this);

  this.stage.draw();
}

p.preDraw = function(node){
  // update matrix, getting ready for apply to the context.
  node.updateMatrix();

  // push the current matrix state to the stack
  this.stage.context.save();

  this.stage.context.globalAlpha *= node.alpha;

  // 2d affine transform
  this.stage.context.transform(node._m.a,  node._m.b, node._m.c, node._m.d, node._m.tx+0.5|0, node._m.ty+0.5|0);
  // ctx.transform(node._m.a, node._m.b, node._m.c, node._m.d, node._m.tx, node._m.ty);
  // ctx.drawImage(node.image, node._rect.x, node._rect.y, node._rect.width, node._rect.height, 0, 0, node._rect.width, node._rect.height);
}

p.draw = function(node){
  this.stage.context.drawImage(node.image, 0, 0);
}

p.postDraw = function(){
  // pop the last saved matrix state, assign to the context.
  this.stage.context.restore();
}