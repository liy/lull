function Activity(stage){
  Container.call(this);

  // stage size
  this._width = 800;
  this._height = 600;
  this._zoomScale = 0.8;

  // contains all the thumbnails
  this._thumbContainer = new Container();
  this.addChild(this._thumbContainer);

  // thumb slots
  this._slots = new Array(20);

  stage.addChild(this);

  this._selectedThumb = null;

  this.zoomedIn = false;

  this.initTemplate();
  // testing
  this.onComplete();
}
var p = Activity.prototype = Object.create(Container.prototype);

p.requestData = function(){

}

p.initTemplate = function(){
  var horizontalPadding = 10;
  var itemSpace = 10;
  var lineSpace = 10;
  var numColumns = 5;
  var numRows = this._slots.length/numColumns;
  var itemWidth = (this._width - (numColumns-1)*itemSpace - horizontalPadding*2)/numColumns;
  var itemHeight = 3/4 * itemWidth;

  var tx = horizontalPadding;
  var ty = (this._height - itemHeight*numRows - (numRows-1)*lineSpace)/2;

  for(var i=0; i<this._slots.length; ++i){
    this._slots[i] = new Rect(tx, ty, itemWidth, itemHeight);

    tx += itemWidth + itemSpace;
    if((i+1)%numColumns == 0){
      tx = horizontalPadding;
      ty += itemHeight + lineSpace;
    }
  }
}

p.onComplete = function(){
  for(var i=0; i<this._slots.length; ++i){
    var thumbnail = new SceneThumbnail(this._slots[i].width, this._slots[i].height);
    this._thumbContainer.addChild(thumbnail);
    thumbnail.x = this._slots[i].x;
    thumbnail.y = this._slots[i].y;
    thumbnail.load('http://placekitten.com/400/300');

    thumbnail.addEventListener('click', bind(this, this.onThumbClick));
  }
}

p.onThumbClick = function(e){
  this._selectedThumb = e.currentTarget;

  // zoom in
  sx = this._width*this._zoomScale / this._selectedThumb.width;
  sy = this._height*this._zoomScale / this._selectedThumb.height;
  tx = -this._selectedThumb.x*sx + this._width*(1-this._zoomScale)*0.5;
  ty = -this._selectedThumb.y*sy + this._height*(1-this._zoomScale)*0.5;
  TweenLite.to(this._thumbContainer, 0.5, {scaleX: sx, scaleY: sy, x: tx, y: ty, ease:Power4.easeOut, onComplete: this.showScene});
  // fade out unselected thumbnail
  for(var i=0; i<this._thumbContainer.numChildren; ++i){
    var thumb = this._thumbContainer.getChildAt(i);
    thumb.visible = true;
    if(thumb !== this._selectedThumb){

      TweenLite.to(thumb, 0.5, {alpha: 0, onComplete: function(){
        this.target.visible = false;
      }});
    }
  }
}

p.showScene = function(){

}