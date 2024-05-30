"use strict";

class ScoreBoardManager {
	#score;
	#highscore;
	#element;
	/**@returns {Readonly<{score: number, highscore: number}>}*/
	get ScoreInfo() {
		return Object.freeze(Object.assign({}, this));
	}
	/**@private @param {HTMLDivElement} boardElement  @param {number} score @param {number} highscore*/
	constructor(boardElement, score, highscore) {
		this.#element = boardElement;
		this.#score = score;
		this.#highscore = highscore;
	}
	/**@param {HTMLDivElement} boardElement*/
	static GetScoreBoard(boardElement) {
		const highscore = Number(localStorage.getItem('highscore') ?? 0);

		boardElement.querySelector('.high-score').innerHTML = `High Score: ${highscore}`;

		return new ScoreBoardManager(boardElement, 0, highscore);
	}
	Update() {
		this.#element.querySelector('.score').innerHTML = `Score: ${this.#score}`;
	}
	/**@param {number} val*/
	AddScore(val) {
		this.#score += val;
		if (this.#score > this.#highscore) {//reset & save highscore to the new highest score
			this.#highscore = this.#score;
			localStorage.setItem('highscore', this.#highscore);
		}
	}
}