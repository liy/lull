// // var loader = new ActivityLoader();
// // loader.load('example/activity.json');

var activity = {
  title: "Day after day",
  description: "This is a song from the ancient times",
  updated_at: "1992",
  created_at: "",
  totalScenes: 1,
  scenes:[
    {
      index: 0,
      type: 0,
      scenery: {
        nodes: []
      },
      nodes: [
        {
          type: "text",
          x: 100,
          y: 100,
          width: 200,
          height: 30,
          text: {
            value: "There is a place",
            fontSize: 16,
            color: "#000"
          }
        },
        {
          type: "image",
          x: 200,
          y: 300,
          width: 100,
          height: 60,
          attributes:{
            url: "https://www.google.co.uk/images/srpr/logo4w.png"
          }
        }
      ]
    }
  ],
  userInfo:{
    name: 'liy'
  }
}


var mediator = new Mediator(activity)
mediator.addListener(ModelEvent.UPDATE, function(evt){
  console.log(evt.target);
});

mediator.scenes.push({sceneName:'testing'});
mediator.scenes.get(1).sceneName = 'Scene 2';
console.log(mediator.scenes.get(1).sceneName);