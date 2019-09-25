/**
 * @typedef {object} game15.Tile.params
 *
 * @property {string} label
 */


(function() {

	'use strict';

	const CSS_CLASS = 'tile';

	/**
	 *
	 * @param {game15.Tile.params} params
	 * @constructor
	 */
	const Tile = function(params) {
		console.log('Tile constructor');

		console.log(params['label']);
		this.params = params;
		this._render();
	};

	Tile.prototype.container = undefined;

	Tile.prototype._render = function() {
		this.container = document.createElement('div');
		this.container.textContent = this.params.label;
		this.container.classList.add(CSS_CLASS);
	};


	game15.Tile = Tile;
})();