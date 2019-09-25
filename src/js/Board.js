(function() {

	'use strict';

	const BOARD_ROWS = 4;
	const BOARD_COLUMNS = 4;

	const Board = function(params) {

		this._createRandomMatrix();
		this._render();
	};

	Board.prototype.container = undefined;
	Board.prototype.matrix = undefined;

	Board.prototype._render = function() {
		this.container = document.createElement('div');
		for(let row = 0; row < BOARD_ROWS; row++) {
			for(let column = 0; column < BOARD_COLUMNS; column++) {
				this.matrix[row][column].htmlElement = document.createElement('div');
				this.container.appendChild(this.matrix[row][column].htmlElement);
				if (this.matrix[row][column].tileObject !== null) {
					this.matrix[row][column].htmlElement.appendChild(this.matrix[row][column].tileObject.container);
				}
			}

		}
	};

	Board.prototype._createRandomMatrix = function() {
		this.matrix = [];
		let randomArray = [];
		for(let i=0; i < BOARD_ROWS * BOARD_COLUMNS; i++) {
			randomArray[i] = i + 1;
		}
		randomArray.sort(() => Math.random() - 0.5);
		alert(randomArray);
		for(let row = 0; row < BOARD_ROWS; row++) {
			this.matrix[row] = [];
			for (let column = 0; column < BOARD_COLUMNS; column++) {
				const label = randomArray[row * BOARD_COLUMNS + column].toString();
				this.matrix[row][column] = (label === '16') ? this._createNewMatrixElement(undefined, new game15.Tile())
					: this._createNewMatrixElement(undefined, new game15.Tile({label: label}));
			}
		}
	};

	Board.prototype._createNewMatrixElement = function(htmlElement, tileObject) {
		return {htmlElement: htmlElement, tileObject: tileObject};
	};

	game15.Board = Board;
})();