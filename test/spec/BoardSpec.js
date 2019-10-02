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
});