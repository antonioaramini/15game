module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],

		files: [
			'../src/js/gameManager.js',
			'../src/js/Tile.js',
			'../src/**/*.js',
			// Test specs
			'spec/*Spec.js',
			'spec/**/*Spec.js'
		]
	})
}