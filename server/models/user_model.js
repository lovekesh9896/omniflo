const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		mobileNumber: {
			type: String,
			required: true,
		},
		borrowRequest: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "borrow",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", User);
