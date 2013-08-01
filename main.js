var sceneFactory = new SceneFactory();

// var cityScene = sceneFactory.createScene('resource/city/scene.js');

// var CitySceneClass = sceneFactory.classes['resource/city/scene.js'];
// var anotherCityScene = new CitySceneClass();
// anotherCityScene.name = "another city scene";
// console.log(anotherCityScene);

// console.log(cityScene);

// function loop(){
//   cityScene.render();
//   requestAnimFrame(loop);
// }


var desertScene = sceneFactory.createScene('http://localhost:4444/desert/scene.js');
console.log(desertScene);