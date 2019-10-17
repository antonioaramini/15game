(function() {

	'use strict';

	const CSS_BOARD = 'game15_Board';

	const BOARD_DIMENSION = 4;

	const Board = function(params) {

		this._render();
	};

	Board.prototype.container = undefined;
	Board.prototype.matrix = undefined;
	Board.prototype.emptyTilePosition = {row: undefined, column: undefined};

	Board.prototype._render = function() {
		this.container = document.createElement('div');
		this.container.classList.add(CSS_BOARD);
		this.container.style.setProperty('--grid-dimension', BOARD_DIMENSION);
		const randomNumbersArray = game15.createRandomSolvableConfigurationArray(BOARD_DIMENSION*BOARD_DIMENSION);

		this.matrix = [];
		for(let row = 0; row < BOARD_DIMENSION; row++) {
			this.matrix[row] = [];
			for(let column = 0; column < BOARD_DIMENSION; column++) {
				const label = randomNumbersArray.shift();
				const tileObject = (label === BOARD_DIMENSION*BOARD_DIMENSION) ? new game15.Tile() : new game15.Tile({label: label});
				this.matrix[row][column] = this._createNewMatrixElement(document.createElement('div'), tileObject);

				this.container.appendChild(this.matrix[row][column].htmlElement);

				if (tileObject.getNumber() !== null) {
					this.matrix[row][column].htmlElement.appendChild(tileObject.container);
					tileObject.container.addEventListener(game15.Tile.TILE_CUSTOM_EVENT, function() {
						const tilePosition = this._getTilePosition(tileObject);
						if (this._isMovableTile(tilePosition)) {
							this._moveTile(tilePosition);
						}
					}.bind(this));
				} else {
					this.emptyTilePosition.row = row;
					this.emptyTilePosition.column = column;
				}
			}
		}
	};

	Board.prototype._getTilePosition = function(tileObject) {
		for(let row = 0; row < BOARD_DIMENSION; row++) {
			for(let column = 0; column < BOARD_DIMENSION; column++) {
				if (this.matrix[row][column].tileObject === tileObject) {
					return {row: row, column: column};
				}
			}
		}
	};

	Board.prototype._isMovableTile = function(tilePosition) {
		return (Math.abs(tilePosition.row - this.emptyTilePosition.row) + Math.abs(tilePosition.column - this.emptyTilePosition.column) === 1);
	};

	Board.prototype._moveTile = function(tilePosition) {
		const emptyTile = this.matrix[this.emptyTilePosition.row][this.emptyTilePosition.column].tileObject;
		const tileToMove = this.matrix[tilePosition.row][tilePosition.column].tileObject;
		this.matrix[tilePosition.row][tilePosition.column].htmlElement.removeChild(tileToMove.container);
		this.matrix[tilePosition.row][tilePosition.column].tileObject = emptyTile;
		this.matrix[this.emptyTilePosition.row][this.emptyTilePosition.column].htmlElement.appendChild(tileToMove.container);
		this.matrix[this.emptyTilePosition.row][this.emptyTilePosition.column].tileObject = tileToMove;
		// Update empty tile position
		this.emptyTilePosition = tilePosition;

		if (this.isBaseConfiguration() === true) {
			alert("YOU WON");
		}
	};

	Board.prototype._createNewMatrixElement = function(htmlElement, tileObject) {
		return {htmlElement: htmlElement, tileObject: tileObject};
	};

	Board.prototype.isBaseConfiguration = function() {
		for(let row = 0; row < BOARD_DIMENSION; row++) {
			for(let column = 0; column < BOARD_DIMENSION; column++) {
				if (row === BOARD_DIMENSION -1 && column === BOARD_DIMENSION -1) {
					return true;
				} else if (this.matrix[row][column].tileObject.getNumber() !== (column + 1 + row * BOARD_DIMENSION)) {
					return false;
				}
			}
		}
	};

	game15.Board = Board;
})();