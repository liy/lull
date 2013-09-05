// TODO: singleton
function ServiceProvider(){
  this.loginService = new WebService('http://dev.helpkidzlearn.com/hklwcf');
  this.cm3Service = new WebService('http://dev.helpkidzlearn.com/cm3wcf');
}
var p = ServiceProvider.prototype;

ServiceProvider.getInstance = function(){
  if(!ServiceProvider.instance)
    ServiceProvider.instance = new ServiceProvider();
  return ServiceProvider.instance;
}

p.login = function(un, ps){
  var op = this.loginService.getOperation('/user/login', 'POST');
  op.requestData = JSON.stringify({username: un, password:md5(ps)});

  // better to tell server more information about the payload.
  op.xhr.setRequestHeader('Content-Type', 'application/json');
  op.xhr.setRequestHeader('Accept', 'application/json');

  return op;
}

p.getActivities = function(){
  var operation = this.cm3Service.getOperation("/user/"+UserProfile.currentProfile.sessionKey+"/activities", 'GET');
  
  return operation;
}

p.createActivity = function(data){
  
}

p.getActivity = function(id){

}

p.saveActivity = function(){

}

p.autoSave = function(){

}