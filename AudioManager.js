"use strict"

class AudioManager {
	#obj;
	/**@private @param {Object<string, HTMLAudioElement>} obj*/
	constructor(obj) {
		this.#obj = obj;
	}
	/**@param {...{alias: string, filename: string, volume: number}} audioStructs*/
	static GetAudioManager(...audioStructs) {
		const obj = {};
		for (const { alias, filename, volume } of audioStructs) {
			const audio = new Audio(filename);
			audio.volume = volume;
			obj[alias] = audio;
		}

		return new AudioManager(obj);
	}
	/**@param {string} alias*/
	Play(alias) {
		this.#obj[alias].play();
	}
}