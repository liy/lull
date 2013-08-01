function SceneFactory(){
  this.classes = new Object();
}
var p = SceneFactory.prototype;

p.loadScene = function(uri){
  var loader = new ScriptLoader();
  loader.load(uri);

  var sceneClass = SceneFactory._initClass();
  this.classes[uri] = sceneClass;

  // Finishes with the script, remove the script text from the header.
  // Note that the actual function definition still in the memory(in the javascript interpreter engine),
  // so you will still be able to use correct class function(stored in the array) to instantiate corresponding scene.
  loader.removeScript();

  return sceneClass;
}

p.createScene = function(uri){
  var sceneClass = this.loadScene(uri);

  return new sceneClass();
}
