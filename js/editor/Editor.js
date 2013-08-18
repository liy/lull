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

var scene = new Scene();
canvasRenderer.stage.addChild(scene);
console.log(scene.width);

var sub = new Container();
scene.addChild(sub);

var bmp = new Bitmap();
bmp.addListener(Event.COMPLETE, function(){
  sub.x = 200;
  sub.y = 200;
  sub.graphics.beginFill('#FF0000', 1);
  sub.graphics.drawRect(0, 0, 128, 256);
  sub.graphics.endFill();
  // sub.width = 128/2;
  console.log(scene.width, scene.height);

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

      // bmp.radian = Math.PI/2;
      // console.log(scene.width);



      updateTime += CONFIG.MS_PER_UPDATE;
      ++loops;
    }

    // scene.width += (100 - scene.width)/20;
    // scene.height += (100 - scene.height)/20;

    // render as much as possible. Does not care about the duplicate frames rendering
    canvasRenderer.render();
    stats.end();

    requestAnimFrame(mainloop)
  })();
})
bmp.load('somacruz.png');
sub.addChild(bmp);


canvasRenderer.canvas.addEventListener('click', function(e){
  // console.log(e);
  var x = e.x;
  var y = e.y - canvasRenderer.canvas.offsetTop;
  console.log(scene.hitTest(x, y));
}, false);