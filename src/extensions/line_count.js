gimme.extend('function', {

	// returns the line count (loc) of the function
	lineCount: function() {
		var funcStr = this.entity.toString();
		return funcStr.split('\n').length;
	}
});
