function CanvasRenderer(width, height, container){
  Renderer.call(this);

  this.stats = new Stats();
  this.stats.setMode(2);
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.right = '0px';
  this.stats.domElement.style.top = '0px';
  document.body.appendChild(this.stats.domElement);

  this.clearColor = 0xCCC;

  this.canvas = document.createElement('canvas');
  this.canvas.width = width || 800;
  this.canvas.height = height || 600;
  var canvasContainer = container || document.getElementsByTagName('body')[0];
  canvasContainer.appendChild(this.canvas);

  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = '#' + this.clearColor.toString(16);

  this.stage = new Stage(this);

  this.mouse = new Mouse(this);

  // The last timestamp when update is called
  this._lastUpdateTime = getTickCount();
  // Just for calculate the delta time between different update call.
  this._deltaTime = 0;
  // The time when the input process should be finished
  this._inputTime = getTickCount();
  // The time when the update process should be finished
  this._updateTime = getTickCount();
  // current number of loops in input processing or update processing
  this._loops = 0;

  this.mainloop();
}
var p = CanvasRenderer.prototype = Object.create(Renderer.prototype);

p.render = function(delta){
  // draw stage
  // reset to identity matrix transform
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.fillStyle = '#' + this.clearColor.toString(16);
  // clear the screen
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.save();

  // reset identity
  this.stage._m.identity();
  // transform according to camera matrix
  if(this.stage.camera != null){
    this.stage.camera.update();
    var m = this.stage.camera.matrix;
    this.context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
  }

  var len = this.stage._children.length;
  for(var i=0; i<len; ++i){
    this.stage._children[i].updateContext(this.context);
    this.stage._children[i].draw(this.context);
    this.stage._children[i].postDraw(this.context);
  }

  this.context.restore();
}

p.mainloop = function(){
  this.stats.begin();

  // reset loop count
  this._loops = 0;
  // processing update
  while(getTickCount() > this._updateTime && this._loops < CONFIG.MAX_FRAMES_SKIP){
    // first update the physics collision detection
    //_physicsEngine->Update();

    var currentTime = getTickCount();
    // calculate the delta mini seconds between different update call.
    this._deltaTime = currentTime -  this._lastUpdateTime;
    // ready for next delta calculation, the current time become to the last update time.
    this._lastUpdateTime = currentTime;

    // then update game state and animation, etc.
    // _currentScene->Update(deltaTime);

    this._updateTime += CONFIG.MS_PER_UPDATE;
    ++this._loops;
  }

  // render as much as possible. Does not care about the duplicate frames rendering
  this.render();

  this.stats.end();

  requestAnimFrame(bind(this, this.mainloop));
}
