SceneFactory._initClass = function(){

  function GameScene(){
    Scene.call(this);
    this.name = "desert scene";
  }
  var p = GameScene.prototype = Object.create(Scene.prototype);

  p.render = function(){
    Scene.prototype.render.call(this);
  }

  return GameScene;
}