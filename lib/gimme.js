(function(global, factory) {

	if (typeof module !== 'undefined' && module.exports !== 'undefined') {
		module.exports = factory();
	}

	else {
		global.gimme = factory();
	}

})(this, function() {

'use strict';

var prototypes = {},
	allTypes = 'array boolean date function number null object regexp string undefined'.split(' '),
	typesRe = /^([a-z]+( |,)*)+$/i
;

var _init = function() {
	var i = 0;
	var len = allTypes.length;

	for(i; i < len; i++) {
		prototypes[allTypes[i]] = {};
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


function dateToUTC(date) {
	return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 
		date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

var millisecondsMap = {
	'ms': 1,
	's': 1000,
	'm': 1000 * 60,
	'h': 1000 * 60 * 60,
	'd': 1000 * 60 * 60 * 24,
};

gimme.extend('date', {

	difference: function(date, accuracy) {
		var firstDate = this.entity,
			secondDate = date,
			accuracy = accuracy || 'ms',
			milliseconds
		;

		if (accuracy in millisecondsMap) {
			milliseconds = millisecondsMap[accuracy];
		}

		else {
			throw new Error('Accuracy is not a valid string');
		}

		if (gimme.type(secondDate) !== 'date') {
			throw new Error('First argument must be a Date object');
		} 

		return Math.floor((dateToUTC(firstDate) - dateToUTC(secondDate)) / milliseconds);
	}
});
var hash = {};

function inArray(elem) {

	// if element is in hash, returns true and if not
	// puts the element in the hash with the value of true
	// and returns false
	return hash[elem] ? true : (hash[elem] = true) && false;
}

gimme.extend('array', {
	elementTypes: function(unique) {

		unique = unique || false;

		var arr = this.entity,
			len = arr.length,
			i = 0,
			elements = [],
			type
		;

		while (i < len) {
			type = gimme.type(arr[i]);

			if (!unique || !inArray(type)) {
				elements.push(type);
			}

			i++;
		}

		return elements;
	}
});


gimme.extend('string array', {

	length: function() {
		return this.entity.length;
	}

});
gimme.extend('function', {
	lineCount: function() {
		var funcStr = this.entity.toString();
		return funcStr.split('\n').length;
	}
});
gimme.extend('object', {

	members: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			members.push(obj[member]);
		}

		return members;
	},

	methods: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			if (gimme.type(obj[member]) === 'function') {
				members.push(obj[member]);
			}
		}

		return members;
	},

	properties: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			if (gimme.type(obj[member]) !== 'function') {
				members.push(obj[member]);
			}
		}

		return members;
	},

	ownMembers: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			if (obj.hasOwnProperty(member)) {
				members.push(obj[member]);
			}
		}

		return members;
	},

	ownMethods: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			if (obj.hasOwnProperty(member) && gimme.type(obj[member]) === 'function') {
				members.push(obj[member]);
			}
		}

		return members;
	},

	ownProperties: function() {
		var member;
		var obj = this.entity;
		var members = [];

		for (member in obj) {
			if (obj.hasOwnProperty(member) && gimme.type(obj[member]) !== 'function') {
				members.push(obj[member]);
			}
		}

		return members;
	}
});
gimme.extend('function', {
	name: function() {
		var funcStr = this.entity.toString();
		
		return funcStr.slice('function '.length, funcStr.indexOf('('));
	}
});
return gimme;

});