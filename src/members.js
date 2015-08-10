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