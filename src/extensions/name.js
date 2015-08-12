gimme.extend('function', {

	// returns the name of the function
	name: function() {

		// turn the function expression into a string
		var funcStr = this.entity.toString();
		
		// the function name is located between 'function ' 
		// and the first parenthesis
		return funcStr.slice('function '.length, funcStr.indexOf('('));
	}
});
