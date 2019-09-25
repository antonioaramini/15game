describe('Tile.js', function() {
	'use strict'

	const CSS_CLASS = 'tile';

	it('should be a tile CSS class', function() {
		const tile = new game15.Tile({});

		expect(tile.container).toHaveClass(CSS_CLASS);
	});

	it('should have a container that is a div', function() {
		const tile = new game15.Tile({});

		expect(tile.container.tagName).toEqual('DIV');
	});

	it('should have a container with textContent equal to the passed label', function() {
		const tile = new game15.Tile({label: 'text'});

		expect(tile.container.textContent).toEqual('text');
	});
})

