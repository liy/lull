HitTest = Object.create(null);

HitTest.canvas = document.createElement('canvas');
HitTest.canvas.width = HitTest.canvas.height = 1;
HitTest.context = HitTest.canvas.getContext('2d');

HitTest.process = function(displayObject, x, y){
  // push the current matrix state to the stack
  this.context.save();
  // 2d affine transform
  this.context.transform(1, 0, 0, 1, -x, -y);
  displayObject.draw(this.context);
  // pop the last saved matrix state, assign to the context.
  this.context.restore();

  // TODO: do testing
  var hit = this.context.getImageData(0, 0, 1, 1).data[3] > 0;

  // TODO: clear
  this.context.fillRect(0, 0, 1, 1);

  return hit;
}