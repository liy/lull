SceneryFactory._initClass = function(){

  function GameScenery(){
    Scenery.call(this);
    this.name = "desert scenery";
  }
  var p = GameScenery.prototype = Object.create(Scenery.prototype);

  p.render = function(){
    Scenery.prototype.render.call(this);
  }

  return GameScenery;
}