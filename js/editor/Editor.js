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

var sub = new Container();
scene.addChild(sub);

scene.x = scene.y = 10;
scene.graphics.beginFill('#FF0000', 1);
scene.graphics.drawRect(0, 0, 100, 100);
scene.graphics.endFill();

sub.name = 'sub';
sub.graphics.beginFill('#00FF00', 1);
sub.graphics.drawRect(10, 10, 200, 200);
sub.graphics.endFill();

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

  // render as much as possible. Does not care about the duplicate frames rendering
  canvasRenderer.render();
  stats.end();

  // requestAnimFrame(mainloop)
})();

// var canvasRenderer = new CanvasRenderer();
// canvasRenderer.context.fillStyle = '#FFF'   
// canvasRenderer.context.fillRect(0,0,150,150);
// canvasRenderer.context.save();      

// canvasRenderer.context.fillStyle = '#FF0000';
// canvasRenderer.context.translate(10, 10);      
// canvasRenderer.context.fillRect(0,0,120,120);
// canvasRenderer.context.save();                  

// canvasRenderer.context.fillStyle = '#00FF00';
// canvasRenderer.context.translate(10, 10);          
// canvasRenderer.context.globalAlpha = 0.5;    
// canvasRenderer.context.fillRect(0,0,90,90);

// // // Restore previous state
// canvasRenderer.context.restore();           
// canvasRenderer.context.fillRect(0,0,60,60);   

// // // Restore original state
// canvasRenderer.context.restore();
// // canvasRenderer.context.fillStyle = '#0000FF';  
// canvasRenderer.context.fillRect(0,0,90,90);  