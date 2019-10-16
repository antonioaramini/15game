(function() {

	'use strict';

	const CSS_BOARD = 'game15_Board';

	const BOARD_DIMENSION = 4;

	const Board = function(params) {

		this._render();
		this._addTileCustomEventListener();
	};

	Board.prototype.container = undefined;
	Board.prototype.matrix = undefined;
	Board.prototype.emptyTilePosition = {row: undefined, column: undefined};

	Board.prototype._render = function() {
		this.container = document.createElement('div');
		this.container.classList.add(CSS_BOARD);
		const randomNumbersArray = this._createRandomNumbersArray();

		this.matrix = [];
		for(let row = 0; row < BOARD_DIMENSION; row++) {
			this.matrix[row] = [];
			for(let column = 0; column < BOARD_DIMENSION; column++) {
				const label = randomNumbersArray.shift();
				const tileObject = (label === BOARD_DIMENSION*BOARD_DIMENSION) ? new game15.Tile() : new game15.Tile({label: label});
				this.matrix[row][column] = this._createNewMatrixElement(document.createElement('div'), tileObject);

				this.container.appendChild(this.matrix[row][column].htmlElement);

				if (tileObject.container !== undefined) {
					this.matrix[row][column].htmlElement.appendChild(tileObject.container);
					tileObject.attachCustomEventDispatcherOnClick(game15.Tile.TILE_CUSTOM_EVENT, {tileObject: tileObject});
				} else {
					this.emptyTilePosition.row = row;
					this.emptyTilePosition.column = column;
				}
			}

		}
	};

	Board.prototype._createRandomNumbersArray = function() {
		let randomNumbersArray = [];
		do {
			for (let i = 0; i < BOARD_DIMENSION * BOARD_DIMENSION; i++) {
				randomNumbersArray[i] = i + 1;
			}
			randomNumbersArray.sort(() => Math.random() - 0.5);
		} while (!this.isSolvable(randomNumbersArray));
		return randomNumbersArray;
	};

	Board.prototype._addTileCustomEventListener = function() {
		this.container.addEventListener(game15.Tile.TILE_CUSTOM_EVENT, function(event) {
			const tilePosition = this._getTilePosition(event.detail.tileObject);
			if (this._isMovableTile(tilePosition)) {
				this._moveTile(tilePosition);
			}
		}.bind(this));
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

	Board.prototype.isSolvable = function(randomNumbersArray) {
		return this._getConfigurationSolvabilitySum(randomNumbersArray) % 2 === 0;
	};

	Board.prototype._getConfigurationSolvabilitySum = function (randomNumbersArray) {
		const countedSet = new Set();
		let sum = 0;
		for (let k = 0; k < BOARD_DIMENSION * BOARD_DIMENSION; k++) {
			let smallerNumbers = randomNumbersArray[k] - 1;
			for (let i = randomNumbersArray[k] - 1; i > 0; i--) {
				if (countedSet.has(i)) {
					smallerNumbers--;
				}
			}
			countedSet.add(randomNumbersArray[k]);
			sum += smallerNumbers;
			if (randomNumbersArray[k] === BOARD_DIMENSION * BOARD_DIMENSION) {
				const emptyTilePosition = {row: Math.floor(k / BOARD_DIMENSION), column: k % BOARD_DIMENSION};
				sum += BOARD_DIMENSION - 1 - emptyTilePosition.row + BOARD_DIMENSION - 1 - emptyTilePosition.column;
			}
		}
		return sum;
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