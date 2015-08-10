var gimme = require('../lib/gimme');
var expect = require('chai').expect;

describe('members', function() {

	var parentObj = {
		parentMethod: function() {},
		anotherParentMethod: function() {},
		parentProp: '',
	};

	var childObj = Object.create(parentObj);
	childObj.childMethod = function() {};
	childObj.childProp = false;

	//----------------------------------

	describe('members()', function() {

		it('should return all object members incl. the prototype chain', function() {
			var result = gimme(childObj).members();
			var expectedArr = [
				childObj.childMethod,
				childObj.childProp,
				parentObj.parentMethod, 
				parentObj.anotherParentMethod,
				parentObj.parentProp,
			];

			expect(result).to.eql(expectedArr);
		});
	});

	describe('properties()', function() {

		it('should return all object properties (not methods) incl. the prototype chain', function() {
			var result = gimme(childObj).properties();
			var expectedArr = [
				childObj.childProp,
				parentObj.parentProp,
			];

			expect(result).to.eql(expectedArr);
		});
	});

	describe('methods()', function() {

		it('should return all object methods (not properties) incl. the prototype chain', function() {
			var result = gimme(childObj).methods();
			var expectedArr = [
				childObj.childMethod,
				parentObj.parentMethod, 
				parentObj.anotherParentMethod,
			];

			expect(result).to.eql(expectedArr);
		});
	});

	describe('ownMembers()', function() {

		it("should return all object's own members", function() {
			var result = gimme(childObj).ownMembers();
			var expectedArr = [
				childObj.childMethod,
				childObj.childProp,
			];

			expect(result).to.eql(expectedArr);
		});
	});

	describe('ownProperties()', function() {

		it("should return all object's own properties (not methods)", function() {
			var result = gimme(childObj).ownProperties();
			var expectedArr = [
				childObj.childProp,
			];

			expect(result).to.eql(expectedArr);
		});
	});

	describe('ownMethods()', function() {

		it("should return all object's own methods (not properties", function() {
			var result = gimme(childObj).ownMethods();
			var expectedArr = [
				childObj.childMethod,
			];

			expect(result).to.eql(expectedArr);
		});
	});
});