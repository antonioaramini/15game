describe('Board', function() {


	it('should have a container that is a div', function() {
		const board = new game15.Board();

		expect(board.container.tagName).toEqual('DIV');
	});
});