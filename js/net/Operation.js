function Operation(endPoint, path, method){
  EventDispatcher.call(this);

  if(path.charAt(0) !== '/')
    path = '/' + path;

  this.xhr = new XMLHttpRequest();
  this.xhr.open(method, endPoint + path, true);
  this.xhr.onload = bind(this, this.onComplete);
  this.xhr.onerror = bind(this, this.onError);
  this.xhr.onprogress = bind(this, this.onProgress);
  this.xhr.onreadystatechange = bind(this, this.onReadyStateChange);
}
var p = Operation.prototype = Object.create(EventDispatcher.prototype);

p.send = function(data){
  if(data) 
    this.requestData = data;

  this.xhr.send(this.requestData);
}

p.onReadyStateChange = function(e){
  // console.log(this.xhr.status);
}

p.onProgress = function(e){
}

p.onComplete = function(e){
  this.responseData = e.target.responseText;

  if(this.callback)
    this.callback();

  this.dispatchEvent(new Event(Event.COMPLETE));
}

p.onError = function(e){
  //console.log(e);
}