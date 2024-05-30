/**@type {Plane}*/ let plane;
let scoreBoard = ScoreBoardManager.GetScoreBoard(document.querySelector('.score-board-container'));
let audioController = AudioManager.GetAudioManager([
	{ alias: 'point', location: './sfx/point.wav', volume: 1 },
	{ alias: 'jump', location: './sfx/jump.wav', volume: 1 },
	{ alias: 'explosion', location: './sfx/explosion.mp3', volume: 1 },
	{ alias: 'prayer', location: './sfx/allahu_akbar.mp3', volume: 0.1 }
], false);
let gameState = false;

let TIME;
requestAnimationFrame(function loop(time) {//update loop
	if (!gameState && document.querySelector('.explosion') != null && document.querySelector('.building') != null) {//band-aid fix for building animation deletion
		if (document.querySelector('.building').getBoundingClientRect().right < document.querySelector('.game-area').getBoundingClientRect().left) {
			document.querySelector('.game-area').removeChild(document.querySelector('.building'));
		}
	}

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

	const audioBool = Boolean(Number(localStorage.getItem('audio-settings') ?? 1)); //default on
	audioController.ToggleMute(audioBool);
	document.querySelector('.sfx-toggle').dataset['active'] = String(Number(audioBool));
	document.querySelector('.sfx-toggle').src = (audioBool) ? './img/audio.png' : './img/no-audio.png';

	gameState = true;
}

function HandlePostGame() {
	gameState = false;

	document.body.appendChild(document.querySelector('#game-over-menu-template').content.cloneNode(true));
	const element = document.querySelector('.game-over-menu');

	const explosion = document.createElement('img');
	explosion.src = './img/explosion.png';
	explosion.draggable = false;
	explosion.className = 'explosion';
	explosion.style.left = `${plane.Position.x}px`;
	explosion.style.top = `${plane.Position.y}px`;
	document.querySelector('.game-area').appendChild(explosion);

	audioController.Play('explosion');
	audioController.Play('prayer');

	element.querySelector('img').addEventListener('click', () => {
		location.reload();
	});

	document.addEventListener('keyup', (e) => {
		if (e.key == 'Enter' || e.key == ' ') {
			location.reload();
		}
	});
}

document.querySelector('.sfx-toggle').addEventListener('click', () => {
	const newBool = !Boolean(Number(document.querySelector('.sfx-toggle').dataset['active']));
	document.querySelector('.sfx-toggle').dataset['active'] = String(Number(newBool));

	document.querySelector('.sfx-toggle').src = (newBool) ? './img/audio.png' : './img/no-audio.png';

	localStorage.setItem('audio-settings', Number(newBool));

	audioController.ToggleMute(newBool);
});