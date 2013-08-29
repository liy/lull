var renderer = new CanvasRenderer();

var activity = new Activity(renderer.stage);
var activityController = new ActivityController(activity);

var root = new Container();
renderer.stage.addChild(root);
var container = new Container();
root.addChild(container);

var bmp = new Bitmap();
bmp.load('somacruz.png');
container.addChild(bmp);


bmp.addEventListener(Event.COMPLETE, function(e){
  // console.log(container.width, container.height);
  // container.radian = Math.PI/4;
  // console.log(container.width, container.height);

  bmp.x = bmp.y = 0.5;
  bmp.scaleX = bmp.scaleY = 0.5;
  console.log(container.getBounds(container));
})

// var bmp = new Bitmap();
// bmp.load('somacruz.png');
// renderer.stage.addChild(bmp);

// bmp.addEventListener(Event.COMPLETE, function(e){
//   console.log(bmp.width, bmp.height);
//   bmp.radian = Math.PI/4;
//   console.log(bmp.width, bmp.height);
// })