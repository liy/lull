HitTest = Object.create(null);

HitTest.canvas = document.createElement('canvas');
HitTest.canvas.width = HitTest.canvas.height = 1;
HitTest.context = HitTest.canvas.getContext('2d');

HitTest.process = function(displayObject, x, y){
  this.context.save();
  // since we only draw 1 pixel, the pixel that needs testing. Just translate the pixel to the 0, 0 position, that is translate -x, -y.
  this.context.setTransform(1, 0, 0, 1, -x, -y);
  // draw the pixel that needs testing.
  displayObject.draw(this.context);

  // Get the alpha from the testing pxiel, If it is none 0, it's a hit
  var hit = this.context.getImageData(0, 0, 1, 1).data[3] > 0;

  console.log(displayObject, this.context.getImageData(0, 0, 1, 1).data, hit);

  this.context.restore();
  this.context.clearRect(0, 0, 1, 1);

  return hit;
}