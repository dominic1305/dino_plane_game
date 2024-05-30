class Tower {
	/**@type {Tower[]}*/ static #instanceArr = [];
	static #timer = 200;
	#element;
	#velocity;
	#active = false;
	#hasPassed = false;
	static get InstaceArr() {
		return Object.freeze(Tower.#instanceArr.map(bin => Object.freeze(bin)));
	}
	get Position() {
		return {
			x: parseFloat(window.getComputedStyle(this.#element).left),
			y: parseFloat(window.getComputedStyle(this.#element).top)
		};
	}
	get BoundingBox() {
		return this.#element.getBoundingClientRect();
	}
	get InBounds() {
		const rect = this.BoundingBox;
		const box = document.querySelector('.game-area').getBoundingClientRect();

		return !(rect.top > box.bottom || rect.right < box.left || rect.bottom < box.top || rect.left > box.right);
	}
	/**@private @param {HTMLImageElement} element @param {number} velocity*/
	constructor(element, velocity) {
		this.#element = element;
		this.#velocity = velocity;
	}
	static Spawn() {
		if (this.#timer-- > 0) return;
		this.#timer = Math.floor(Math.random() * (400 - 200) + 200); //randamise spawn delay

		const element = document.createElement('img');
		element.className = 'tower';
		element.src = './img/tower.png';
		element.draggable = false;

		element.style.left = `${document.querySelector('.game-area').clientWidth}px`;
		element.style.transform = `scale(${Math.random() * (1.1 - 0.9) + 0.9})`;

		document.querySelector('.game-area').appendChild(element);

		const tower = new Tower(element, Math.floor(Math.random() * (6 - 4) + 4));
		this.#instanceArr.push(tower);
	}
	#HasPassedPlane() {
		const thisRect = this.BoundingBox;
		const targRect = plane.BoundingBox;

		return (targRect.left > thisRect.right);
	}
	dispose() {
		this.#element.parentElement.removeChild(this.#element);
		Tower.#instanceArr.splice(Tower.#instanceArr.indexOf(this), 1);
	}
	Update() {
		if (this.InBounds && !this.#active) this.#active = true;
		if (!this.InBounds && this.#active) this.dispose();

		if (this.#HasPassedPlane() && !this.#hasPassed) {//has passed the plane for the first time
			audioController.Play('point');
			this.#hasPassed = true;
		}

		this.#element.style.left = `${this.Position.x - this.#velocity}px`;
	}
}