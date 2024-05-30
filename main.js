/**@type {Plane}*/ let plane;
let scoreBoard = ScoreBoardManager.getScoreBoard(document.querySelector('.score-board-container'));
let gameState = false;

let TIME;
requestAnimationFrame(function loop(time) {//update loop
	if (gameState && time != null) {
		document.querySelector('.fps-counter').innerHTML = `${Math.round(1000 / (time - TIME))}fps`;
		TIME = time;

		Tower.Spawn();
		plane.Update();
		scoreBoard.AddScore(1);
		scoreBoard.Update();
		for (const tower of Tower.InstaceArr) {
			tower.Update();
		}
	}
	requestAnimationFrame(loop);
});

window.onload = () => {//start game
	plane = Plane.CreatePlane({ x: 200, y: 200 }, 11);
	gameState = true;
}