// var renderer = new CanvasRenderer();

// var activity = new Activity(renderer.stage);
// var activityController = new ActivityController(activity);
//
var provider = ServiceProvider.getInstance();

var profile = UserProfile.getInstance();
profile.addEventListener(Event.COMPLETE, signedIn);
profile.login('information', 'incinf0!');

console.log(profile.sessionKey);

function signedIn(e){
  var op = provider.getActivities();
  op.callback = function(){
    console.log(this);
  }
  op.send()
}