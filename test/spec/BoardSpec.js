describe('Board', function() {
	'use strict';

	const CSS_BOARD = 'game15_Board';

	const BOARD_DIMENSION = 4;

	let board;

	beforeEach(function() {
		board = new game15.Board();
	});

	describe('.container', function() {

		it('should have a container that is a div', function() {
			expect(board.container.tagName).toEqual('DIV');
		});

		it('should have the ' + CSS_BOARD + ' css class', function() {
			expect(board.container).toHaveClass(CSS_BOARD);
		});
	});

	describe('.matrix', function() {

		it('should have a ' + BOARD_DIMENSION + 'x' + BOARD_DIMENSION + ' matrix', function() {
			expect(board.matrix).toBeDefined();
			expect(board.matrix.length).toEqual(BOARD_DIMENSION);
			board.matrix.forEach(function(elementsArray) {
				expect(elementsArray.length).toEqual(BOARD_DIMENSION);
			});
		});

		it('should have matrix with elements that are objects with properties tileObject and htmlElement', function() {
			board.matrix.forEach(function(elementsArray) {
				elementsArray.forEach(function(gridElement) {
					expect(gridElement.tileObject).toBeDefined();
					expect(gridElement.htmlElement).toBeDefined();
				})
			})
		});
	});

	describe('.isSolvable()', function() {

	});

	describe('.getConfigurationSolvabilitySum()', function() {
		it('must return an odd number for a non solvable configuration', function() {
			const numbersArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16];

			expect(board._getConfigurationSolvabilitySum(numbersArray)).toEqual(1);
		});

		it('must return 0 for the Base configuration', function() {
			const numbersArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

			expect(board._getConfigurationSolvabilitySum(numbersArray)).toEqual(0);
		});

		it('test 1', function() {
			const numbersArray = [11,1,3,4,2,10,14,8,15,7,16,5,9,6,13,12];

			expect(board._getConfigurationSolvabilitySum(numbersArray)).toEqual(44);
		});
	});

	describe('.isBaseConfiguration()', function() {
		it('must return true for the Base configuration', function() {
			const numbersArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
			const matrix = [];
			for(let row = 0; row < BOARD_DIMENSION; row++) {
				matrix[row] = [];
				for(let column = 0; column < BOARD_DIMENSION; column++) {
					const label = numbersArray.shift();
					const tileObject = (label === BOARD_DIMENSION*BOARD_DIMENSION) ? new game15.Tile() : new game15.Tile({label: label});
					matrix[row][column] = {tileObject: tileObject};
				}
			}
			board.matrix = matrix;

			expect(board.isBaseConfiguration()).toEqual(true);
		});
	});
});