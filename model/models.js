const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		age: {
			type: Number,
			required: true,
		},
	},
	{
		collection: 'testcollection',
	}
);

const User = mongoose.model('User', subscriberSchema);

module.exports = User;
