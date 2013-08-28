var renderer = new CanvasRenderer();

// var activity = new Activity(renderer.stage);
// var activityController = new ActivityController(activity);

var root = new Container();
renderer.stage.addChild(root);
var container = new Container();
root.addChild(container);

var bmp = new Bitmap();
bmp.load('somacruz.png');
container.addChild(bmp);

bmp.addEventListener(Event.COMPLETE, function(e){
  console.log(container.width, container.height);
})