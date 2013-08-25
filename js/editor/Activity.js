function Activity(stage){
  Container.call(this);

  this._width = 800;
  this._height = 600;

  this._sceneZoomWidth = this._width * 0.8;
  this._sceneZoomHeight = this._height * 0.8;

  stage.addChild(this);

  this.availableSlots = 20;

  this.scenes = [];
  this.slots = new Array(this.availableSlots);

  this.selectedScene = null;

  this.zoomedIn = false;

  this.initTemplate();
  // testing
  this.onComplete();
}
var p = Activity.prototype = Object.create(Container.prototype);

p.initTemplate = function(){
  var horizontalPadding = 10;
  var itemSpace = 10;
  var lineSpace = 10;
  var numColumns = 5;
  var numRows = this.availableSlots/numColumns;
  var itemWidth = (this._width - (numColumns-1)*itemSpace - horizontalPadding*2)/numColumns;
  var itemHeight = 3/4 * itemWidth;

  var tx = horizontalPadding;
  var ty = (this._height - itemHeight*numRows - (numRows-1)*lineSpace)/2;

  this.slots.length = 0;
  for(var i=0; i<this.availableSlots; ++i){
    this.slots[i] = new Rect(tx, ty, itemWidth, itemHeight);

    tx += itemWidth + itemSpace;
    if((i+1)%numColumns == 0){
      tx = horizontalPadding;
      ty += itemHeight + lineSpace;
    }
  }
}

p.onComplete = function(){
  this.scenes.length = 0;
  for(var i=0; i<this.slots.length; ++i){
    this.scenes[i] = new Scene(this.slots[i].width, this.slots[i].height);
    this.addChild(this.scenes[i]);
    this.scenes[i].x = this.slots[i].x;
    this.scenes[i].y = this.slots[i].y;

    this.scenes[i].addEventListener('click', bind(this, this.onSceneClick));
  }
}

p.onSceneClick = function(e){
  this.selectedScene = e.currentTarget;

  var sx, sy, tx, ty, alpha;
  if(this.zoomedIn){
    sx = sy = 1;
    tx = ty = 0;
    alpha = 1;

    this.zoomedIn = false;
  }
  else{
    sx = this._sceneZoomWidth / this.selectedScene.width;
    sy = this._sceneZoomHeight / this.selectedScene.height;

    tx = -this.selectedScene.x*sx + this._width*0.1;
    ty = -this.selectedScene.y*sy + this._height*0.1;

    alpha = 0;

    this.zoomedIn = true;
  }


  // fade out other scenes
  for(var i=0; i<this.scenes.length; ++i){
        this.scenes[i].visible = true;
    if(this.scenes[i] !== this.selectedScene){

      TweenLite.to(this.scenes[i], 0.5, {alpha: alpha, onComplete: function(){
        this.target.visible = (alpha === 0) ? false : true;
      }});
    }

  }

  TweenLite.to(this, 0.5, {scaleX: sx, scaleY: sy, x: tx, y: ty, ease:Power4.easeOut});

}