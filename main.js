var canvasRenderer = new CanvasRenderer();

var cont = new Container();
canvasRenderer.stage.addChild(cont);

cont.x = 100;
cont.y = 50;

var bmp = new Bitmap();
bmp.load('library/city/city.jpg');
bmp.scaleX = bmp.scaleY = 0.2;
cont.addChild(bmp);