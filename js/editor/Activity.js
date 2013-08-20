function Activity(stage){
  Container.call(this);

  this._width = 800;
  this._height = 600;

  stage.addChild(this);

  this.availableSlots = 12;

  this.scenes = [];
  this.slots = new Array(this.availableSlots);

  this.initTemplate();
  // testing
  this.onComplete();
}
var p = Activity.prototype = Object.create(Container.prototype);

p.initTemplate = function(){
  var horizontalPadding = 0;
  var itemSpace = 10;
  var lineSpace = 10;
  var numColumns = 4;
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
  for(var i=0; i<1; ++i){
    this.scenes[i] = new Scene(this.slots[i].width, this.slots[i].height);
    this.addChild(this.scenes[i]);
    // this.scenes[i].x = this.slots[i].x;
    // this.scenes[i].y = this.slots[i].y;
    // this.scenes[i].x = 10
    // this.scenes[i].y = 15
  }
}

p.update = function(){

}

p.zoomIn = function(scene){

}