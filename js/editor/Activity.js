function Activity(stage){
  this.scenes = [];

  // testing
  this.complete();
}
var p = Activity.prototype;

p.onComplete = function(){
  this.scene.length = 0;

  for(var i=0; i<10; ++i){
    this.scenes[i] = new Scene();
  }
}

p.update = function(){

}

p.zoomIn = function(scene){

}