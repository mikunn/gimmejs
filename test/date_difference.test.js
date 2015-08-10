var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('difference()', function() {
	var firstDate = new Date(2015, 2, 28);
	var secondDate = new Date(2015, 3, 5);
	
	it('should by default return the difference between two dates in milliseconds', function() {
		var result = gimme(secondDate).difference(firstDate);
		var expected = 1000*60*60*24*8;

		expect(result).to.equal(expected);
	});

	it('should return the difference between two dates in full days', function() {
		var result = gimme(secondDate).difference(firstDate, 'd');
		var expected = 8;

		expect(result).to.equal(expected);
	});

	it('should throw an error with invalid first argument', function() {
		var func = gimme(secondDate).difference;

		expect(func).to.throw(Error);
	});

	it('should throw an error with invalid 2nd argument', function() {
		var func = function() {
			gimme(secondDate).difference(firstDate, 'abracadabra');
		};

		var func2 = function() {
			gimme(secondDate).difference(firstDate, {});
		};

		expect(func).to.throw(Error);
		expect(func2).to.throw(Error);
	});
});