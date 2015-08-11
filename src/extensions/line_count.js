gimme.extend('function', {
	lineCount: function() {
		var funcStr = this.entity.toString();
		return funcStr.split('\n').length;
	}
});
