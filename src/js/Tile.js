/**
 * @typedef {object} game15.Tile.params
 *
 * @property {string} label
 */


(function() {

	'use strict';

	const CSS_TILE = 'game15_Tile';

	const TILE_CUSTOM_EVENT='tileClicked';

	/**
	 *
	 * @param {game15.Tile.params} params
	 * @constructor
	 */
	const Tile = function(params) {
		if (params === undefined) {
			return;
			// alternatively we can throw an exception
		}
		this.params = params;
		this._render();
		this._attachEvents();
	};

	Tile.prototype.container = undefined;

	Tile.prototype._render = function() {
		this.container = document.createElement('div');
		if (this.params.label !== undefined) {
			this.container.textContent = this.params.label;
		}
		this.container.classList.add(CSS_TILE);
	};

	Tile.prototype._attachEvents = function() {
		const clickEvent = new Event(TILE_CUSTOM_EVENT);
		this.container.addEventListener('click', function() {
			this.container.dispatchEvent(clickEvent)
		}.bind(this));

	};

	Tile.prototype.getNumber = function() {
		return (this.params !== undefined && this.params.label !== undefined) ? this.params.label : null;
	};


	game15.Tile = Tile;
	game15.Tile.TILE_CUSTOM_EVENT = TILE_CUSTOM_EVENT;
})();