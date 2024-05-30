"use strict"

class AudioManager {
	#obj;
	#mute;
	/**@private @param {Object<string, HTMLAudioElement>} obj @param {boolean} mute*/
	constructor(obj, mute) {
		this.#obj = obj;
		this.#mute = mute;
	}
	/**@param {{alias: string, location: string, volume: number}[]} audioStructs @param {boolean} mute*/
	static GetAudioManager(audioStructs, mute = false) {
		const obj = {};
		for (const { alias, location: filename, volume } of audioStructs) {
			const audio = new Audio(filename);
			audio.volume = volume;
			obj[alias] = audio;
		}

		return new AudioManager(obj, mute);
	}
	/**@param {string} alias*/
	Play(alias) {
		if (this.#mute) return;
		this.#obj[alias].play();
	}
	/**@param {boolean?} override*/
	ToggleMute(override) {
		if (typeof override == 'boolean') this.#mute = override;

		this.#mute = !this.#mute;
	}
}