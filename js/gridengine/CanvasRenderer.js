function CanvasRenderer(width, height, container){
  Renderer.call(this);

  this.clearColor = 0xCCC;

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
  this.context.save();

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
    this.stage._children[i].draw(this.context);
  }

  this.context.restore();
}