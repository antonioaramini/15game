(function() {

	'use strict';

	const CSS_BOARD = 'game15_Board';

	const BOARD_DIMENSION = 4;

	const Board = function(params) {

		this._render();
	};

	Board.prototype.container = undefined;
	Board.prototype.matrix = undefined;

	Board.prototype._render = function() {
		this.container = document.createElement('div');
		this.container.classList.add(CSS_BOARD);
		const randomNumbersArray = this._createRandomNumbersArray();

		this.matrix = [];
		for(let row = 0; row < BOARD_DIMENSION; row++) {
			this.matrix[row] = [];
			for(let column = 0; column < BOARD_DIMENSION; column++) {
				const label = randomNumbersArray.shift();
				this.matrix[row][column] = this._createNewMatrixElement(document.createElement('div'),
					(label === BOARD_DIMENSION*BOARD_DIMENSION) ? new game15.Tile() : new game15.Tile({label: label}));

				this.container.appendChild(this.matrix[row][column].htmlElement);

				if (this.matrix[row][column].tileObject.container !== undefined) {
					this.matrix[row][column].htmlElement.appendChild(this.matrix[row][column].tileObject.container);
				}
			}

		}
	};

	Board.prototype._createRandomNumbersArray = function() {
		let randomNumbersArray = [];
		for(let i=0; i < BOARD_DIMENSION * BOARD_DIMENSION; i++) {
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