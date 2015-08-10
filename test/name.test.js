var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('name()', function() {
	it('should return the function name', function() {
		function someFunc(){
			a = 0;

			while(a < 10) {
				a++;
			}
		};

		var result = gimme(someFunc).name();
		var expected = 'someFunc';

		expect(result).to.equal(expected);
	});
});