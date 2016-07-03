require('pixi.js');

var renderer = new PIXI.WebGLRenderer( window.innerWidth, window.innerHeight, {antialias : true});

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();


var graphics = new PIXI.Graphics();

// set a fill and line style
// graphics.beginFill(0xFFffff);
graphics.lineStyle(10, 0xffff00, 2);

// draw a shape
graphics.moveTo(50,50);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(50, 50);
graphics.endFill();

stage.addChild(graphics);

// run the render loop
animate();

function animate() {

    renderer.render(stage);
    requestAnimationFrame( animate );
}
