HitTest = Object.create(null);

HitTest.canvas = document.createElement('canvas');
HitTest.canvas.width = HitTest.canvas.height = 1;
HitTest.context = HitTest.canvas.getContext('2d');

HitTest.process = function(displayObject, x, y){
  // With all its transformation matrix ready, directly draw the display object onto the 1px context.
  // And then, simply do a inverse of the mouse position to locate the correct pixel.
  var m = displayObject.concatedMatrix;

  // TODO: camera transform.
  if(displayObject.stage && displayObject.stage.camera)
    m = displayObject.stage.camera.matrix.multiplyRight(m);

  // if hitArea is defined, use hitArea as test target. Also update the matrix.
  var testTarget = displayObject;
  if(displayObject.hitArea){
    testTarget = displayObject.hitArea;
    m.multiplyRight(testTarget.matrix);
  }

  HitTest.context.setTransform(m.a, m.b, m.c, m.d, m.tx-x, m.ty-y);
  // draw the pixel that needs testing.
  testTarget.draw(HitTest.context);

  // Get the alpha from the testing pixel, If it is none 0, it's a hit
  var hit = HitTest.context.getImageData(0, 0, 1, 1).data[3] > 0;

  // reset and clear the 1 pixel context.
  HitTest.context.setTransform(1, 0, 0, 1, 0, 0);
  HitTest.context.clearRect(0, 0, 1, 1);

  return hit;
}