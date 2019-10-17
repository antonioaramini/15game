(function() {

	game15.getConfigurationSolvabilitySum = function(configurationArray) {
		const countedSet = new Set();
		let sum = 0;
		const boardDimension = Math.sqrt(configurationArray.length);
		for (let k = 0; k < configurationArray.length; k++) {
			let smallerNumbers = configurationArray[k] - 1;
			for (let i = configurationArray[k] - 1; i > 0; i--) {
				if (countedSet.has(i)) {
					smallerNumbers--;
				}
			}
			countedSet.add(configurationArray[k]);
			sum += smallerNumbers;
			if (configurationArray[k] === configurationArray.length) {
				const emptyTilePosition = {row: Math.floor(k / boardDimension), column: k % boardDimension};
				sum += boardDimension - 1 - emptyTilePosition.row + boardDimension - 1 - emptyTilePosition.column;
			}
		}
		return sum;
	};

	const _createRandomNumbersArray = function(length) {
		let randomNumbersArray = [];
		for (let i = 0; i < length; i++) {
			randomNumbersArray[i] = i + 1;
		}
		randomNumbersArray.sort(() => Math.random() - 0.5);
		return randomNumbersArray;
	};

	game15.isConfigurationSolvable = function(configurationArray) {
		return this.getConfigurationSolvabilitySum(configurationArray) % 2 === 0;
	};

	game15.createRandomSolvableConfigurationArray = function(length) {
		let randomConfigurationArray;
		do {
			randomConfigurationArray = _createRandomNumbersArray(length);
		} while (!this.isConfigurationSolvable(randomConfigurationArray));
		return randomConfigurationArray;
	};

})();