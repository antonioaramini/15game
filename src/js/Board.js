(function() {

	'use strict';

	const BOARD_ROWS = 4;
	const BOARD_COLUMNS = 4;

	const Board = function(params) {

		this._render();
	};

	Board.prototype.container = undefined;
	Board.prototype.matrix = undefined;

	Board.prototype._render = function() {
		this.container = document.createElement('div');
		const randomNumbersArray = this._createRandomNumbersArray();

		this.matrix = [];
		for(let row = 0; row < BOARD_ROWS; row++) {
			this.matrix[row] = [];
			for(let column = 0; column < BOARD_COLUMNS; column++) {
				const label = randomNumbersArray.shift();
				this.matrix[row][column] = this._createNewMatrixElement(document.createElement('div'),
					(label === BOARD_ROWS*BOARD_COLUMNS) ? new game15.Tile() : new game15.Tile({label: label}));

				this.container.appendChild(this.matrix[row][column].htmlElement);

				if (this.matrix[row][column].tileObject.container !== undefined) {
					this.matrix[row][column].htmlElement.appendChild(this.matrix[row][column].tileObject.container);
				}
			}

		}
	};

	Board.prototype._createRandomNumbersArray = function() {
		let randomNumbersArray = [];
		for(let i=0; i < BOARD_ROWS * BOARD_COLUMNS; i++) {
			randomNumbersArray[i] = i + 1;
		}
		randomNumbersArray.sort(() => Math.random() - 0.5);
		return randomNumbersArray;
	};

	Board.prototype._createNewMatrixElement = function(htmlElement, tileObject) {
		return {htmlElement: htmlElement, tileObject: tileObject};
	};

	game15.Board = Board;
})();