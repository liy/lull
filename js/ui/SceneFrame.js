function SceneFrame(){
  DisplayObject.call(this);

  this.targetWidth = 640/4;
  this.targetHeight = 480/4;
}
var p = SceneFrame.prototype = Object.create(DisplayObject.prototype);

p.drawFrame = function(){
  this.graphics.clear();

  this.width = (this.targetWidth - this.width)/20;
  this.height = (this.targetHeight - this.height)/20;

  this.graphics.beginFill('#000', 1);
  this.graphics.drawRect(0, 0, this.width, this.height);
  this.graphics.endFill();

  this.graphics.beginFill('#FFF', 1);
  this.graphics.drawRect(5, 5, this.width-10, this.height-10);
  this.graphics.endFill();
}
