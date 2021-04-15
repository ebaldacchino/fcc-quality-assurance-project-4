class SudokuSolver {
	validate(puzzleString) {
		if (!puzzleString) {
			return 'Required field missing';
		}
		const invalidPuzzleString = puzzleString
			.split('')
			.find(
				(char) => ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].find((n) => n == char)
			);

		if (invalidPuzzleString) {
			return 'Invalid characters in puzzle';
		}
		if (puzzleString.length !== 81) {
			return 'Expected puzzle to be 81 characters long';
		}
		return false;
	}

	alreadyThere(puzzleString, row, column, value) {
		const index = row * 9 + column - 1;
		if (puzzleString[index] == value) return true;
		return false;
	}

	checkInPuzzle(puzzleString, row, column, value) {}

	checkRowPlacement(puzzleString, row, column, value) {
		const startValue = row * 9;
		for (let i = startValue; i < startValue + 9; i++) {
			if (Number(puzzleString[i]) === value) return 'row';
		}
		return false;
	}

	checkColPlacement(puzzleString, row, column, value) {
		for (let i = column - 1; i < puzzleString.length; i += 9) {
			if (Number(puzzleString[i]) === value) return 'column';
		}
		return false;
	}

	checkRegionPlacement(puzzleString, row, column, value) {
		const findStartValue = (x) => Math.floor(x / 3) * 3;
		const startOfRegionRow = findStartValue(row) * 9;
		const startOfRegionColumn = findStartValue(column - 1);
		const regionsIndex = startOfRegionRow + startOfRegionColumn;
		for (let i = regionsIndex; i < regionsIndex + 3; i++) {
			for (let j = 0; j < 3; j++) {
				const index = i + j * 9;
				if (puzzleString[index] == value) return 'region';
			}
		}
		return false;
	}

	checkConflicts(puzzleString, row, column, value) {
		const params = [puzzleString, row, column, value];
		const isValidInRow = this.checkRowPlacement(...params);
		const isValidInColumn = this.checkColPlacement(...params);
		const isValidInRegion = this.checkRegionPlacement(...params);

		const conflicts = [isValidInRow, isValidInColumn, isValidInRegion].filter(
			(result) => result
		);
		if (conflicts.length !== 0) {
			return conflicts;
		}
		return false;
	}

	solve(puzzleString) {
		const isInvalid = this.validate(puzzleString);

		if (isInvalid) {
			return { error: isInvalid };
		}
		const stringTest = () => puzzleString.includes('.');
		let prevString;
		while (stringTest()) {
			for (let row = 0; row < 9; row++) {
				for (let col = 0; col < 9; col++) {
					let possibleNumbers = [];
					const index = row * 9 + col;
					if (puzzleString[index].match(/[.]/g)) {
						for (let val = 1; val <= 9; val++) {
							const params = [puzzleString, row, col + 1, val];
							if (!this.checkConflicts(...params)) {
								possibleNumbers.push(val);
							}
						}

						if (possibleNumbers.length === 1) {
							puzzleString =
								puzzleString.slice(0, index) +
								possibleNumbers[0] +
								puzzleString.slice(index + 1);
						}
					}
				}
			}
			const notChanging = prevString === puzzleString;
			if (notChanging) {
				return stringTest()
					? { error: 'Puzzle cannot be solved' }
					: {
							solution: puzzleString,
					  };
			}
			prevString = puzzleString;
		}
		return {
			solution: puzzleString,
		};
	}
}

module.exports = SudokuSolver;
