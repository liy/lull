SceneFactory._initClass = function(){

  function GameScene(){
    Scene.call(this);
    this.name = "city scene";
  }
  var p = GameScene.prototype = Object.create(Scene.prototype);

  return GameScene;
}