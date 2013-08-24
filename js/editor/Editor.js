var renderer = new CanvasRenderer();

var activity = new Activity(renderer.stage);
var activityController = new ActivityController(activity);

var camera = new Camera(800, 600, 0.5, 0.5);
renderer.stage.camera = camera;
camera.x = 100;
camera.y = 100;

document.addEventListener('click', onClick);

function onClick(e){
  // camera.x = renderer.mouse.position.x;
  // camera.y = renderer.mouse.position.y;
}