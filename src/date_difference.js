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
