'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const checkPuzzle = require('../controllers/check-puzzle');
const solvePuzzle = require('../controllers/solve-puzzle');

module.exports = function (app) {
	let solver = new SudokuSolver();

	app.route('/api/check').post(checkPuzzle);

	app.route('/api/solve').post(solvePuzzle);
};
