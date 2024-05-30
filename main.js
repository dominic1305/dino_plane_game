/**@type {Plane}*/ let plane;
let gameState = false;

let TIME;
requestAnimationFrame(function loop(time) {//update loop
	if (gameState && time != null) {
		document.querySelector('.fps-counter').innerHTML = `${Math.round(1000 / (time - TIME))}fps`;
		TIME = time;

		Tower.Spawn();
		plane.Update();
		for (const tower of Tower.InstaceArr) {
			tower.Update();
		}
	}
	requestAnimationFrame(loop);
});

window.onload = () => {//start game
	plane = Plane.CreatePlane({ x: 200, y: 200 }, 12);
	gameState = true;
}