function HitTest(renderer){
  this.renderer = renderer;

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.canvas.height = 1;
  this.context = this.canvas.getContext('2d');
}
var p = HitTest.prototype;

p.process = function(displayObject, x, y){
  // update matrix, getting ready for apply to the context.
  node.updateMatrix();

  // push the current matrix state to the stack
  this.context.save();

  // 2d affine transform
  this.context.transform(1, 0, 0, 1, x, y);

  displayObject.draw(this.context);

  // pop the last saved matrix state, assign to the context.
  this.context.restore();
}