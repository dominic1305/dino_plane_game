/**@type {Plane}*/ let plane;
let gameState = false;

requestAnimationFrame(function loop() {//update loop
	if (gameState) {
		plane.Update();
	}
	requestAnimationFrame(loop);
});

window.onload = () => {//start game
	plane = Plane.CreatePlane({ x: 200, y: 200 }, 12);
	gameState = true;
}