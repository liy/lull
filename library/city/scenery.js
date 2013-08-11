SceneryFactory._initClass = function(){

  function GameScenery(){
    Scenery.call(this);
    this.name = "city scenery";

    this.image = new Image();
    this.image.src = CONFIG.RESOURCE_PATH + '/city/city.jpg';
    document.getElementsByTagName('body')[0].appendChild(this.image);
  }
  var p = GameScenery.prototype = Object.create(Scenery.prototype);

  return GameScenery;
}