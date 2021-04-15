const SudokuSolver = require('./sudoku-solver.js');

const checkPuzzle = (req, res) => {
	let solver = new SudokuSolver();
	const { puzzle, coordinate, value } = req.body;
	const isInvalid = solver.validate(puzzle);

	if (isInvalid) {
		return res.status(200).json({error: isInvalid});
	} else if (!puzzle || !coordinate || !value) {
		return res.status(200).json({ error: 'Required field(s) missing' });
	}
	const coords = coordinate.split('');
	const isValidLetter = !coords[0].match(/^[A-I]$/);
	const num = Number(coords[1]);
	const isNumber = typeof num === 'number';

	if (coords.length !== 2 || isValidLetter || !isNumber) {
		return res.status(200).json({ error: 'Invalid coordinate' });
	} else if (value < 1 || value > 9 || value != parseInt(value)) {
		return res.status(200).json({ error: 'Invalid value' });
	}

	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
	const row = letters.reduce((total, letter, index) => {
		return letter === coords[0] ? (total = index) : total;
	}, 0);

	const params = [puzzle, row, num, Number(value)];

	if (solver.alreadyThere(...params)) {
		return res.status(200).json({ valid: true });
	}

	const conflicts = solver.checkConflicts(...params)

	if (conflicts) {
		return res.status(200).json({ valid: false, conflict: conflicts });
	}

	return res.status(200).send({ valid: true });
};

module.exports = checkPuzzle;
