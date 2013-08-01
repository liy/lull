function ScriptLoader(){
  this.scriptElement = document.createElement("script");
}
var p = ScriptLoader.prototype;

p.load = function(path, callback, async){
  if(async == undefined) async = false;
  this.callback = callback;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path, async);
  xhr.onload = bind(this, this.onload);
  xhr.send();
}

p.onload = function(e){
  this.data = e.target.responseText;

  var headElement = document.getElementsByTagName("head")[0];
  this.scriptElement.innerHTML = this.data;
  headElement.appendChild(this.scriptElement);

  if(this.callback)
    this.callback(e);
}

p.removeScript = function(){
  var headElement = document.getElementsByTagName("head")[0];
  headElement.removeChild(this.scriptElement);
}