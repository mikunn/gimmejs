var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('extend()', function() {
	describe('first argument', function() {
		describe('as a string of type names separated by spaces and commas', function() {

			gimme.extend(' string array, object , date,null', {
				someMethod: function() {}
			});

			it('should attach the method for a string', function() {
				expect(gimme('test string').someMethod).not.be.undefined;
			});

			it('should attach the method for an array', function() {
				expect(gimme([]).someMethod).not.be.undefined;
			});

			it('should attach the method for an object', function() {
				expect(gimme({}).someMethod).not.be.undefined;
			});

			it('should attach the method for a Date object', function() {
				expect(gimme(new Date()).someMethod).not.be.undefined;
			});

			it('should attach the method for null', function() {
				expect(gimme(null).someMethod).not.be.undefined;
			});
				
			it('should not attach methods to a number', function() {
				expect(gimme(5).someMethod).be.undefined;
			});

		});

		describe('with only one type name or "all" as a string', function() {
			it('should attach the method for the selected type', function() {
				gimme.extend('number', {
					testMethod: function() {}
				});

				expect(gimme(5).testMethod).not.be.undefined;
			});

			it('should attach the method for all types', function() {
				gimme.extend('all', {
					anotherMethod: function() {}
				});

				expect(gimme(5).anotherMethod).not.be.undefined;
				expect(gimme(false).anotherMethod).not.be.undefined;
				expect(gimme(function(){}).anotherMethod).not.be.undefined;
				expect(gimme({}).anotherMethod).not.be.undefined;
				expect(gimme([]).anotherMethod).not.be.undefined;
				expect(gimme('some string').anotherMethod).not.be.undefined;
				expect(gimme(/^$/).anotherMethod).not.be.undefined;
				expect(gimme(new Date()).anotherMethod).not.be.undefined;
				expect(gimme(undefined).anotherMethod).not.be.undefined;
				expect(gimme(null).anotherMethod).not.be.undefined;
			});
		});

		describe('wrong type names', function() {
			it('should not accept wrong spelled type names', function() {
				var func = function() {
					gimme.extend('strig', {
						method: function() {}
					});
				};

				expect(func).to.throw(Error);
			});

			it('should accept capitalized type names', function() {
				var func = function() {
					gimme.extend('string Number, RegExp', {
						method: function() {}
					});
				};

				expect(func).to.not.throw(Error);
				expect(gimme(/^$/).method).not.be.undefined;
			});
		});

	});

	describe('second argument', function() {
		it('must be passed in', function() {
			var func = function() {
				gimme.extend('string');
			}

			expect(func).throw(Error);
		});

		it('should be an object', function() {
			var func = function() {
				gimme.extend('string', 5);
			}

			expect(func).throw(Error);
		});

		it('can be an empty object', function() {
			var func = function() {
				gimme.extend('string', {});
			}

			expect(func).not.throw(Error);
		})
	});
});