"use strict";

class Plane {
	#element;
	#velocity;
	#jumpHeight;
	get BoundingBox() {
		return this.#element.getBoundingClientRect();
	}
	get Position() {
		return {
			x: parseFloat(window.getComputedStyle(this.#element).left),
			y: parseFloat(window.getComputedStyle(this.#element).top)
		};
	}
	get InBounds() {
		const rect = this.BoundingBox;
		const box = document.querySelector('.game-area').getBoundingClientRect();

		return !(rect.left < box.left || rect.top < box.top || rect.right > box.right);
	}
	get OnFloor() {
		const rect = this.BoundingBox;
		const box = document.querySelector('.floor').getBoundingClientRect();

		return (rect.bottom > box.bottom);
	}
	get IsCollidingWithTower() {
		for (const tower of Tower.InstaceArr) {
			const targRect = tower.BoundingBox;
			const thisRect = this.BoundingBox;
			return !(thisRect.top > targRect.bottom || thisRect.right < targRect.left || thisRect.bottom < targRect.top || thisRect.left > targRect.right);
		}

		return false; //no towers for found to collide
	}
	/**@private @param {HTMLImageElement} element @param {number} jumpHeight*/
	constructor(element, jumpHeight) {
		this.#element = element;
		this.#velocity = 0;
		this.#jumpHeight = jumpHeight;
	}
	/**@param {{x: number, y: number}} location @param {number} jumpHeight*/
	static CreatePlane(location, jumpHeight) {
		const element = document.createElement('img');
		element.className = 'plane';
		element.src = './img/plane.png';
		element.draggable = false;

		element.style.top = `${location.y}px`;
		element.style.left = `${location.x}px`;

		document.querySelector('.game-area').appendChild(element);

		const plane = new Plane(element, jumpHeight);
		plane.#AddUserControl();

		return plane;
	}
	#AddUserControl() {
		document.body.addEventListener('keydown', (e) => {//compute actions on key press
			if (!gameState) return;

			switch (e.key) {
				case ' ': {//jump on space
					if (!this.OnFloor) return;
					this.#velocity = this.#jumpHeight;
					this.#element.style.top = `${this.Position.y - this.#velocity}px`; //force a jump so you don't get stuck to the floor
					audioController.Play('jump');
					break;
				}
			}
		});
	}
	Update() {
		if (!this.InBounds) throw new Error('out of bounds');

		if (this.IsCollidingWithTower) return HandlePostGame();

		if (this.OnFloor && this.#velocity <= 0) this.#velocity = 0;
		this.#element.style.top = (!this.OnFloor) ? `${this.Position.y - this.#velocity}px` : `${document.querySelector('.floor').clientHeight + document.querySelector('.game-area').clientHeight - 35 - 50 / 2}px`;
		this.#velocity -= 0.5;
	}
}