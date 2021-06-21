const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Borrow = new Schema(
	{
		amount: {
			type: String,
			required: true,
		},
		reason: {
			type: String,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("borrows", Borrow);
