// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  var shape = new Shape();
  this.addChild(shape);

  shape.graphics.beginFill('#118822', 1);
  shape.graphics.drawRect(0, 0, w, h);
  shape.graphics.endFill();
  shape.x = 20;


  var tx = 30;
  var ty = 30;
  var alpha = 0.2;
  var radian = 0;
  for(var i=0; i<10; ++i){
    var bmp = new Bitmap();
    bmp.load('somacruz.png');
    this.addChild(bmp);
    bmp.name = i;
    bmp.x = tx;
    bmp.y = ty;
    bmp.radian = radian
    bmp.alpha = alpha;
    tx += 30;
    ty += 40;
    alpha /= 0.8;
    radian += 0.04;
  }

  // this.addEventListener('click', function(e){
  //   console.log(e.eventPhase);
  // })

  // bmp.addEventListener('click', function(e){
  //   console.log(e.eventPhase);
  // })





  // this.addEventListener('click', function(e){
  //   console.log("scene");
  //   console.log(e.eventPhase);
  // })

  // bmp.addEventListener('click', function(e){
  //   console.log("bmp");
  //   console.log(e.eventPhase);
  // })
}
var p = Scene.prototype = Object.create(Container.prototype);