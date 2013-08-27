function SceneThumbnail(w, h){
  Container.call(this);

  this.background = new Graphics();
  this.background.beginFill('#000', 1);
  this.background.drawRect(0,0,w,h);
  this.background.beginFill('#FFF', 1);
  this.background.drawRect(1,1,w-2,h-2);
  this.background.endFill();
  this.addChild(this.background);

  this._bmp = new Bitmap();
  this._bmp.x = this._bmp.y = 1;
  this._bmp.scaleX = (w-2)/400;
  this._bmp.scaleY = (h-2)/300;
  this.onComplete = this._bmp.addEventListener(Event.COMPLETE, bind(this, this.onComplete));
  this.addChild(this._bmp);


  this._bmp.mouseEnabled = false;
}
var p = SceneThumbnail.prototype = Object.create(Container.prototype);

p.load = function(uri){
  this._bmp.load(uri);
}

p.onComplete = function(e){

  // console.log(this.width);

  // console.log(this.width, this.height);
  // manually bubble up
  // this._bmp.parent.dispatchEvent(e);
}