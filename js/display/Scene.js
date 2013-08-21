// An activity contains multiple Scenes.
// The scene have a scenery and other props, such as choose box, image etc.
function Scene(w, h){
  Container.call(this);

  // this.graphics.beginFill('#FFF', 1);
  // this.graphics.drawRect(0, 0, w, h);
  // this.graphics.endFill();

  // if(Math.random() < 0.3){
    var bmp = new Bitmap();
    bmp.load('somacruz.png');
    this.addChild(bmp);
    // bmp.scaleX = bmp.scaleY = 0.4;
  // }

  // this.addEventListener('click', function(e){
  //   console.log(e.eventPhase);
  // })

  // bmp.addEventListener('click', function(e){
  //   console.log(e.eventPhase);
  // })


  this.addEventListener('click', function(e){
    console.log("scene");
    console.log(e.eventPhase);
  })

  bmp.addEventListener('click', function(e){
    console.log("bmp");
    console.log(e.eventPhase);
  })
}
var p = Scene.prototype = Object.create(Container.prototype);