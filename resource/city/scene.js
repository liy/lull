SceneFactory._initClass = function(){

  function GameScene(){
    Scene.call(this);
    this.name = "city scene";

    this.image = new Image();
    this.image.src = CONFIG.RESOURCE_PATH + '/city/city.jpg';
    document.getElementsByTagName('body')[0].appendChild(this.image);
  }
  var p = GameScene.prototype = Object.create(Scene.prototype);

  return GameScene;
}