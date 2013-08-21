var renderer = new CanvasRenderer();

var activity = new Activity(renderer.stage);
var activityController = new ActivityController(activity);

var bmp = new Bitmap();
bmp.load('somacruz.png');
renderer.stage.addChild(bmp);
bmp.scaleX = bmp.scaleY = 0.5;
bmp.x = 300;
bmp.y = 400;

bmp.addEventListener('click', function(e){
  console.log(e.toString());
})