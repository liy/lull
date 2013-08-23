// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  var background = new Shape();
  background.graphics.beginFill('#FFF', 1);
  background.graphics.drawRect(0,0,w,h);
  background.graphics.endFill();
  this.addChild(background);

  this.addEventListener('mouseup', bind(this, this.onClick));
}
var p = Scene.prototype = Object.create(Container.prototype);

p.onClick = function(e){
  console.log(e.currentTarget.width);

  this._zoomInClosure = this.addEventListener('enterframe', bind(this, this.zoomIn));
}

p.zoomIn = function(){
  var tw = 800*0.8;
  var th = 600*0.8;

  // console.log('zoom in');
  var dw = (tw - this.width)/10;
  var dh = (th - this.height)/10;
  var w = this.width += dw;
  var h = this.height += dh;

  this.x = (800 - w)/2;
  this.y = (600 - h)/2;

  if(dw < 0.01 && dh < 0.01){
    this.width = tw;
    this.height = th;

    console.log('remove');
    this.removeEventListener('enterframe', this._zoomInClosure);
  }
}