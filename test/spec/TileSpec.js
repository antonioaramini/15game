describe('Tile', function() {
	'use strict';

	const CSS_TILE = 'game15_Tile';

	describe('.container', function() {
		it('is undefined if params is undefined', function() {
			const tile = new game15.Tile();

			expect(tile.container).not.toBeDefined();
		});

		it('has a tile CSS class', function() {
			const tile = new game15.Tile({});

			expect(tile.container).toHaveClass(CSS_TILE);
		});

		it('is a div', function() {
			const tile = new game15.Tile({});

			expect(tile.container.tagName).toEqual('DIV');
		});

		it('has textContent equal to the passed label', function() {
			const tile = new game15.Tile({label: 'text'});

			expect(tile.container.textContent).toEqual('text');
		});
	});

	describe('getNumber', function() {
		it('should return null if params is undefined', function() {
			const tile = new game15.Tile();

			expect(tile.getNumber()).toBeNull();
		});

		it('should return null if params.label is undefined', function() {
			const tile = new game15.Tile({});

			expect(tile.getNumber()).toBeNull();
		});

		it('should return params.label if label is not undefined', function() {
			const tile = new game15.Tile({label: 'testLabel'});

			expect(tile.getNumber()).toEqual('testLabel');
		});
	});

});

