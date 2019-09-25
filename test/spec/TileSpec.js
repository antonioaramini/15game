describe('Tile', function() {
	'use strict';

	const CSS_CLASS = 'tile';

	describe('.container', function() {
		it('is undefined if params is undefined', function() {
			const tile = new game15.Tile();

			expect(tile.container).not.toBeDefined();
		});

		it('has a tile CSS class', function() {
			const tile = new game15.Tile({});

			expect(tile.container).toHaveClass(CSS_CLASS);
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
	

});

