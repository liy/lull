// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  var background = new Shape();
  background.graphics.beginFill('#FFF', 1);
  background.graphics.drawRect(0,0,w,h);
  background.graphics.endFill();
  this.addChild(background);

  var bmp = new Bitmap();
  bmp.load('somacruz.png');
  this.addChild(bmp);

  this.alpha = 0.7;

  this.addEventListener('click', bind(this, this.onClick));
}
var p = Scene.prototype = Object.create(Container.prototype);

p.onClick = function(e){
  console.log(e.currentTarget.width);

  this.zoomIn = this.addEventListener('enterframe', bind(this, this.zoomIn));
}

p.zoomIn = function(){
  var tw = 800*0.8;
  var th = 600*0.8;

  // console.log('zoom in');
  var dw = (tw - this.width)/10;
  var dh = (th - this.height)/10;
  var w = this.width += dw;
  var h = this.height += dh;

  var tx = (800 - tw)/2;
  var ty = (600 - th)/2;
  this.x += (tx - this.x)/10;
  this.y += (ty - this.y)/10;

  if(dw < 0.01 && dh < 0.01){
    this.width = tw;
    this.height = th;

    console.log('remove');

    this.removeEventListener('enterframe', this.zoomIn);
  }
}