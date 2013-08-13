function Runner(module){
  this.module = module;
  this.canvasRenderer = new CanvasRenderer();
}
var p = Runner.prototype;

p.start = function(){

  // The last timestamp when update is called
  var lastUpdateTime = getTickCount();
  // Just for calculate the delta time between different update call.
  var deltaTime = 0;
  // The time when the input process should be finished
  var inputTime = getTickCount();
  // The time when the update process should be finished
  var updateTime = getTickCount();
  // current number of loops in input processing or update processing
  var loops = 0;

  (function mainloop(){
    // reset loop count
    loops = 0;
    // processing update
    while(getTickCount() > updateTime && loops < CONFIG.MAX_FRAMES_SKIP){
      // first update the physics collision detection
      //_physicsEngine->Update();

      var currentTime = getTickCount();
      // calculate the delta mini seconds between different update call.
      deltaTime = currentTime - lastUpdateTime;
      // ready for next delta calculation, the current time become to the last update time.
      lastUpdateTime = currentTime;

      // then update game state and animation, etc.
      // this.module.update();

      updateTime += CONFIG.MS_PER_UPDATE;
      ++loops;
    }


    stats.begin();
    // render as much as possible. Does not care about the duplicate frames rendering
    this.canvasRenderer.render();
    stats.end();

    requestAnimFrame(mainloop)
  })();
}