function ActivityLoader() {

}
var p = ActivityLoader.prototype = Object.create(EventDispatcher.prototype);

p.load = function(path) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.onload = bind(this, this._jsonLoadedHandler);
  xhr.send();
}

p._jsonLoadedHandler = function(evt) {
  // TODO: load all images
  var json = JSON.parse(evt.target.responseText);
  // console.log(json);

  var images = this._traverseScenes(json.scenes);

  console.log(images);
}

p._traverseScenes = function(scenes){
  var images = [];
  for(var i=0; i<scenes.length; ++i){
    images = images.concat(this._getSceneImages(scenes[i]));
  }

  return images;
}

p._getSceneImages = function(scene){
  var images = [];
  var i;
  // get all the images under scenery
  for(i=0; i<scene.scenery.nodes.length; ++i){
    this._getImageNode(scenery.nodes[i], images);
  }

  // get all the images directly under scene
  for(i=0; i<scene.nodes.length; ++i){
    this._getImageNode(scene.nodes[i], images);
  }

  return images;
}

p._getImageNode = function(node, images){
  if(node.type === 'image')
    images.push(node);

  if(node.nodes){
    for(var i=0; i<node.nodes.length; ++i){
      this._getImageNode(node.nodes[i], images);
    }
  }
}

p.onError = function(evt) {

}