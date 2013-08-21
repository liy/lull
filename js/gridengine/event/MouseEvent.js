function MouseEvent(type, bubbles, stageX, stageY, localX, localY){
  bubbles = bubbles || true;
  Event.call(this, type, bubbles);

  this.localX = localX;
  this.localY = localY;

  this.stageX = stageX;
  this.stageY = stageY;
}
MouseEvent.prototype = Object.create(Event.prototype);