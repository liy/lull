/**
 * Factory for Scenery.
 */
function SceneryFactory(){
  this.classes = new Object();
}
var p = SceneryFactory.prototype;

/**
 * Load the scenery script and produce a Scenery class.
 * @param  {String} uri The uri of the scenery script file.
 * @return {Class} The Scenery class.
 */
p.loadScenery = function(uri){
  var loader = new ScriptLoader();
  loader.load(uri);

  var sceneryClass = SceneryFactory._initClass();
  this.classes[uri] = sceneryClass;

  // Finishes with the script, remove the script text from the header.
  // Note that the actual function definition still in the memory(in the javascript interpreter engine),
  // so you will still be able to use correct class function(stored in the array) to instantiate corresponding scene.
  loader.removeScript();

  return sceneryClass;
}

/**
 * Directly create a Scenery instance from the scenery script file.
 * @param  {String} uri The scenery script file uri.
 * @return {Scenery} A instance of the Scenery.
 */
p.createScenery = function(uri){
  var sceneryClass = this.loadScenery(uri);

  return new sceneryClass();
}
