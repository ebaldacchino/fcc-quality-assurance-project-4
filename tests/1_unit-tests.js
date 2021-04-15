const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
	test('Logic handles a valid puzzle string of 81 characters', (done) => {
		assert.isFalse(
			solver.validate(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.'
			),
			'Valid puzzle string should return no errors'
		);
		done();
	});
	test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
		assert.equal(
			solver.validate(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8d'
			),
			'Invalid characters in puzzle',
			'Should return appropriate error message'
		);
		done();
	});
	test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
		assert.equal(
			solver.validate('21343546576...........'),
			'Expected puzzle to be 81 characters long',
			'Should return appropriate error message'
		);
		done();
	});
	test('Logic handles a valid row placement', (done) => {
		assert.equal(
			solver.checkRowPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				0,
				1,
				1
			),
			false,
			'Should return no error'
		);
		done();
	});
	test('Logic handles an invalid row placement', (done) => {
		assert.equal(
			solver.checkRowPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				1,
				2,
				1
			),
			'row',
			'Should return error'
		);
		done();
	});
	test('Logic handles a valid column placement', (done) => {
		assert.equal(
			solver.checkColPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				1,
				2,
				1
			),
			false,
			'Should return no error'
		);
		done();
	});
	test('Logic handles an invalid column placement', (done) => {
		assert.equal(
			solver.checkColPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				0,
				1,
				1
			),
			'column',
			'Should return error'
		);
		done();
	});
	test('Logic handles a valid region (3x3 grid) placement', (done) => {
		assert.equal(
			solver.checkRegionPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				0,
				1,
				1
			),
			false,
			'Should return no error'
		);
		done();
	});
	test('Logic handles an invalid region (3x3 grid) placement', (done) => {
		assert.equal(
			solver.checkRegionPlacement(
				'.7...6...9......41..8..9.5..9...7..2..3...8..4..8...1..8.3..9..16......7...5...8.',
				0,
				1,
				9
			),
			'region',
			'Should return error'
		);
		done();
	});
	test('Valid puzzle strings pass the solver', (done) => {
		const { solution } = solver.solve(
			'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
		);
		assert.isDefined(solution);
		done();
	});
	test('Invalid puzzle strings fail the solver', (done) => {
		const { error, solution } = solver.solve(
			's.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
		);
		assert.isUndefined(solution);
		assert.isDefined(error);
		done();
	});
	test('Solver returns the the expected solution for an incomplete puzzle', (done) => {
		const { solution } = solver.solve(
			'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
		);
		assert.equal(
			solution,
			'769235418851496372432178956174569283395842761628713549283657194516924837947381625'
		); 
		done();
	});
});
