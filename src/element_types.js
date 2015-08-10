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

