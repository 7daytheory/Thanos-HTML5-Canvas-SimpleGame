// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// thanos image
var thanosReady = false;
var thanosImage = new Image();
thanosImage.onload = function () {
	thanosReady = true;
};
thanosImage.src = "images/thanos.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone0.png";

// Game objects
var thanos = {
	speed: 256 // movement in pixels per second
};
var stone = {};
var stonesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a stone
var reset = function () {
	thanos.x = canvas.width / 2;
	thanos.y = canvas.height / 2;
	
	//Randomize Stone
	
	var num = Math.floor((Math.random() * 6) + 0);
	stoneImage.src = "images/stone" + num + ".png";

	// Throw the stone somewhere on the screen randomly
	stone.x = 32 + (Math.random() * (canvas.width - 64));
	stone.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		thanos.y -= thanos.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		thanos.y += thanos.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		thanos.x -= thanos.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		thanos.x += thanos.speed * modifier;
	}

	// Are they touching?
	if (
		thanos.x <= (stone.x + 32)
		&& stone.x <= (thanos.x + 32)
		&& thanos.y <= (stone.y + 32)
		&& stone.y <= (thanos.y + 32)
	) {
		++stonesCaught;
		reset();
	}
};

// Draw Background, Thanos, and Stone
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (thanosReady) {
		ctx.drawImage(thanosImage, thanos.x, thanos.y);
	}

	if (stoneReady) {
		ctx.drawImage(stoneImage, stone.x, stone.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.MarginLeft = "125px";
	
	ctx.fillText("Infinity Stones: " + stonesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

// Cross-browser
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
