// // var loader = new ActivityLoader();
// // loader.load('example/activity.json');

var activityModel = {
  title: "Day after day",
  description: "This is an activity from the ancient times",
  updated_at: "1992",
  created_at: "",
  totalScenes: 1,
  scenes:[
    {
      name:"Woods scene",
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
  creator:{
    name: 'liy'
  }
}

var mediator = new Mediator(activityModel)

mediator.addListener(ModelEvent.UPDATE, function(evt){
  console.log("updated: ");
  console.log(evt.target);
});

mediator.addListener(ModelEvent.ADD, function(evt){
  console.log("added: ");
  console.log(evt.target);
});

// update
mediator.scenes.get(0).name = 'City scene';
// add a scene
mediator.scenes.push({name:'Space scene', index:1});

var view = new View(mediator)
console.log(view);