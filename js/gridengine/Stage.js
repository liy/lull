function Stage(renderer){
  Container.call(this)

  this.renderer = renderer;

  this.camera = null;
}
var p = Stage.prototype = Object.create(Container.prototype);

p.update = function(){
  // var time = Ticker._getTime()-Ticker._startTime;
  // Ticker._ticks++;

  // var elapsedTime = time-Ticker._lastTime;

  // var paused = Ticker._paused;

  // if (paused) {
  //   Ticker._pausedTicks++;
  //   Ticker._pausedTime += elapsedTime;
  // }
  // Ticker._lastTime = time;

  // if (Ticker.hasEventListener("tick")) {
  //   var event = new createjs.Event("tick");
  //   event.paused = paused;
  //   event.delta = elapsedTime;
  //   event.time = time;
  //   event.runTime = time-Ticker._pausedTime;
  //   Ticker.dispatchEvent(event);
  // }

  // Ticker._tickTimes.unshift(Ticker._getTime()-time);
  // while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

  // Ticker._times.unshift(time);
  // while (Ticker._times.length > 100) { Ticker._times.pop(); }
}