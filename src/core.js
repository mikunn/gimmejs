var methods = {},
	allTypes = 'array boolean date function number null object regexp string undefined'.split(' '),
	typesRe = /^([a-z]+( |,)*)+$/i
;

var _populateMethodsKeys = (function(types, methods) {
	var i = 0;
	var len = types.length;

	for(i; i < len; i++) {
		methods[types[i]] = [];
	}

})(allTypes, methods);

var _buildObj = function(entity) {
	var obj = {},
		type = _type(entity),
		arr = methods[type],
		len = arr.length,
		i = 0
	;

	for(i; i < len; i++) {
		obj[arr[i][0]] = arr[i][1];
	}

	obj.entity = entity;
	obj.type = type;

	return obj;
}

var _type = function(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

var _pushToMethods = function(types, selectedMethods) {
	var type,
		method,
		i=0,
		len = types.length
	;

	for(i; i < len; i++) {
		for(method in selectedMethods) {
			type = types[i]

			methods[type].push([method, selectedMethods[method]]);
		}
	}
};

var gimmeTypesArr = function(types) {
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
		throw new Error('The string format of first argument for extend() ' 
			+ ' is invalid.');
	}

	_pushToMethods(gimmeTypesArr(types), selectedMethods);

};

gimme.type = _type;

if (typeof module !== 'undefined' && module.exports !== 'undefined') {
	module.exports = gimme;
}

else {
	global.gimme = gimme;
}

