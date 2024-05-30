/**@type {Plane}*/ let plane;
let scoreBoard = ScoreBoardManager.GetScoreBoard(document.querySelector('.score-board-container'));
let audioController = AudioManager.GetAudioManager(
	{
		alias: 'point',
		filename: './sfx/point.wav',
		volume: 1
	},
	{
		alias: 'jump',
		filename: './sfx/jump.wav',
		volume: 1
	}
);
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

function HandlePostGame() {
	gameState = false;

	document.body.appendChild(document.querySelector('#game-over-menu-template').content.cloneNode(true));
	const element = document.querySelector('.game-over-menu');

	element.querySelector('img').addEventListener('click', () => {
		location.reload();
	});

	document.addEventListener('keyup', (e) => {
		if (e.key == 'Enter') {
			location.reload();
		}
	});
}