module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],

		browsers: ['Chrome'],
		files: [
			'../src/js/gameManager.js',
			'../src/js/Tile.js',
			'../src/**/*.js',
			// Test specs
			'spec/*Spec.js',
			'spec/**/*Spec.js'
		],
		preprocessors: {
			'../src/js/*.js': ['coverage']
		},

		coverageReporter: {
			reporters: [
				{type: 'lcov', dir: 'test/coverage/', subdir: '.'},
				{type: 'text', dir: 'test/coverage/', subdir: '.', file: 'coverage.txt'},
				{type: 'text-summary'}
			]
		},

		reporters: ['progress', 'html', 'coverage']
	})
}