(function(global) {

'use strict';

var prototypes = {},
	allTypes = 'array boolean date function number null object regexp string undefined'.split(' '),
	
	// accepts only words separated by commas and/or spaces
	typesRe = /^([a-z]+( |,)*)+$/i 
;

var _init = function() {
	_initPrototypes();
	_setExports();
};

// populates prototypes object with each type 
// as a key and empty object as a value
var _initPrototypes = function() {
	var i = 0,
		len = allTypes.length
	;

	for(i; i < len; i++) {
		prototypes[allTypes[i]] = {};
	}
};

var _setExports = function() {
	if (typeof module === 'object' && module.exports) {
		module.exports = gimme;
	}

	else {
		global.gimme = gimme;
	}

};

// creates a new object from prototype
// to be returned to the user
var _buildObj = function(entity) {
	var type = _type(entity),
		proto = prototypes[type],
		obj = Object.create(prototypes[type])
	;

	obj.entity = entity;
	obj.type = type;

	return obj;
};

// returns the type of value
var _type = function(value) {

	// using Array.isArray for arrays because of IE "bug"
	return Array.isArray(value) ? 'array' :
		Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

// adds new methods to selected types by adding them
// to the type specific prototype object
var _addMethods = function(types, selectedMethods) {
	var type,
		method,
		i=0,
		len = types.length
	;

	for(i; i < len; i++) {
		type = types[i];

		for(method in selectedMethods) {
			prototypes[type][method] = selectedMethods[method];
		}
	}
};

// converts types string passed to .extend()
// to an array of type names
var _typesStrToArr = function(types) {

	// converts comma or/and space separated
	// words into an array
	types = types.replace(/(\s|,)+/g, ' ').trim().split(' ');

	if (types.indexOf('all') === 0) {
		types = allTypes;
	}

	else {
		types = types.map(function(type) {
			return type.toLowerCase();
		});

		types.forEach(function(type) {
			if (allTypes.indexOf(type) < 0) {
				throw new Error(type + ' is not a known type.')
			}
		});
	}

	return types;
};

// public gimme() function
var gimme = function(entity) {
	return _buildObj(entity);
};

gimme.extend = function(types, selectedMethods) {
	var valid;

	if (_type(types) !== 'string' || _type(selectedMethods) !== 'object') {
		throw new Error('A String expected as the first and an object '
			+ 'as the second parameter for function extend');
	}

	// checks that the format of the types string is valid
	valid = typesRe.test(types.trim());

	if (!valid) {
		throw new Error('The string format of first argument for '
			+ 'extend() is invalid.');
	}

	// selected methods will be added to the prototype of
	// the gimme objects of the selected types
	_addMethods(_typesStrToArr(types), selectedMethods);

};

gimme.type = _type;

_init();
