var canvasRenderer = new CanvasRenderer();

var container = new Container();
canvasRenderer.stage.addChild(container);



var bmp = new Bitmap();
bmp.load('library/city/city.jpg');
bmp.scaleX = bmp.scaleY = 0.2;
bmp.x = 100;
bmp.y = 50;
container.addChild(bmp);