var stats = new Stats();
stats.setMode(2);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

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


var canvasRenderer = new CanvasRenderer();
canvasRenderer.canvas.width = 1024;
canvasRenderer.canvas.height = 768;
var scene = new Scene();
canvasRenderer.stage.addChild(scene);

var bmps = [];
for(var i=0; i<8000; ++i){
  bmps[i] = new Bitmap();
  bmps[i].load("https://si0.twimg.com/profile_images/3109219879/69e64feb87d2cb0b3546653d99c70f2a_normal.png");
  bmps[i].x = canvasRenderer.canvas.width * Math.random();
  bmps[i].y = canvasRenderer.canvas.height * Math.random();
  bmps[i].radian = Math.random() * Math.PI * 2;
  canvasRenderer.stage.addChild(bmps[i]);
}

(function mainloop(){
  stats.begin();

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
    // _currentScene->Update(deltaTime);
    // editor->Update();

    updateTime += CONFIG.MS_PER_UPDATE;
    ++loops;
  }

  for(var i=0; i<bmps.length; ++i){
    bmps[i].radian += 0.01;
    // bmps[i].x = Math.sin(bmps[i].radian) * 100 + 100;
    // bmps[i].y = Math.cos(bmps[i].radian) * 100 + 100;

  }


  // render as much as possible. Does not care about the duplicate frames rendering
  canvasRenderer.render();
  stats.end();

  requestAnimFrame(mainloop)
})();