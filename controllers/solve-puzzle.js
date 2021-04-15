const SudokuSolver = require('./sudoku-solver.js');

const solvePuzzle = (req, res) => {
	let solver = new SudokuSolver();
	res.status(200).send(solver.solve(req.body.puzzle));
};

module.exports = solvePuzzle;
