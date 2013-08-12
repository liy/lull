var stats = new Stats();
stats.setMode(2);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);



var canvasRenderer = new CanvasRenderer();



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
  stats.begin();

  // processing update
  if(getTickCount() > updateTime && loops < CONFIG.MAX_FRAMES_SKIP){
    // first update the physics collision detection
    //_physicsEngine->Update();

    var currentTime = getTickCount();
    // calculate the delta mini seconds between different update call.
    deltaTime = currentTime - lastUpdateTime;
    // ready for next delta calculation, the current time become to the last update time.
    lastUpdateTime = currentTime;

    // then update game state and animation, etc.
    // _currentScene->Update(deltaTime);
    // editor->Update();

    updateTime += CONFIG.MS_PER_UPDATE;
    ++loops;
  }
  else{
    // render the whole thing, as much as possible. Do not care about duplicate frames rendering
    canvasRenderer.render();

    // reset loop count
    loops = 0;
  }

  stats.end();

  requestAnimFrame(mainloop)
})();