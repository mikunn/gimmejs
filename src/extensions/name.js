gimme.extend('function', {
	name: function() {
		var funcStr = this.entity.toString();
		
		return funcStr.slice('function '.length, funcStr.indexOf('('));
	}
});
