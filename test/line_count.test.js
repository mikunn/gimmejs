var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('lineCount()', function() {
	it('should return the line count of a function', function() {
		function someFunc(){
			a = 0;

			while(a < 10) {
				a++;
			}
		};

		var result = gimme(someFunc).lineCount();
		var expected = 7;

		expect(result).to.equal(expected);
	});
});