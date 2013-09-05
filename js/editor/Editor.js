// var renderer = new CanvasRenderer();

// var activity = new Activity(renderer.stage);
// var activityController = new ActivityController(activity);


var profile = UserProfile.getInstance();
profile.addEventListener(Event.COMPLETE, signedIn);
profile.login('information', 'incinf0!');


var provider = ServiceProvider.getInstance();

function signedIn(e){
  provider.getActivities().send();
}