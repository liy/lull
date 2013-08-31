// TODO: singleton
function ServiceProvider(){
  this.app = new WebService();
}
var p = ServiceProvider.prototype;

p.createActivity = function(data){
  var op = this.app.getOperation('activity', 'POST');
  op.send
}

p.getActivity = function(id){

}

p.saveActivity = function(){

}

p.autoSave = function(){

}