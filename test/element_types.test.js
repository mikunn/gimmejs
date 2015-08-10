var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('elementTypes()', function() {
	var arr = ['some string', {}, [], new Date(), 'another string', 2, 5, /$^/];

	it('should return types of each element in the array passed in', function() {
		var result = gimme(arr).elementTypes();
		expect(result).to.eql(['string', 'object', 'array', 'date', 'string', 'number', 'number', 'regexp']);
	});

	it('should return different types in the array passed in when unique is set to true', function() {
		var result = gimme(arr).elementTypes(true);
		expect(result).to.eql(['string', 'object', 'array', 'date', 'number', 'regexp']);
	});
});