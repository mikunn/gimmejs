(function(global) {

'use strict';

var prototypes = {},
	allTypes = 'array boolean date function number null object regexp string undefined'.split(' '),
	typesRe = /^([a-z]+( |,)*)+$/i
;

var _init = function() {
	_initPrototypes();
	_setExports();
};

var _initPrototypes = function() {
	var i = 0,
		len = allTypes.length
	;

	for(i; i < len; i++) {
		prototypes[allTypes[i]] = {};
	}
};

var _setExports = function() {
	if (typeof module !== 'undefined' && module.exports !== 'undefined') {
		module.exports = gimme;
	}

	else {
		global.gimme = gimme;
	}

};

var _buildObj = function(entity) {
	var type = _type(entity),
		proto = prototypes[type],
		obj = Object.create(prototypes[type])
	;

	obj.entity = entity;
	obj.type = type;

	return obj;
};

var _type = function(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

var _pushToMethods = function(types, selectedMethods) {
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

var _gimmeTypesArr = function(types) {
	types = types.replace(/( |,)/g, ' ');
	types = types.split(' ');

	if (types.indexOf('all') === 0) {
		types = allTypes;
	}

	else {
		types = types
			.filter(function(type) {
				return type.length > 1;
			})
			.map(function(type) {
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

var gimme = function(entity) {
	return _buildObj(entity);
};

gimme.extend = function(types, selectedMethods) {
	var valid;

	if (_type(types) !== 'string' || _type(selectedMethods) !== 'object') {
		throw new Error('A String expected as the first and an object '
			+ 'as the second parameter for function extend');
	}

	valid = typesRe.test(types.trim());

	if (!valid) {
		throw new Error('The string format of first argument for '
			+ 'extend() is invalid.');
	}

	_pushToMethods(_gimmeTypesArr(types), selectedMethods);

};

gimme.type = _type;

_init();
