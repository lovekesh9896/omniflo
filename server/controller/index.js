const User = require("../models/user_model");
const Borrow = require("../models/borrow");
const jwt = require("jsonwebtoken");

const authUser = async (req, res) => {
	try {
		let user = await User.findOne({ mobileNumber: req.body.mobileNumber });

		if (!user) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			return res.status(200).json({
				message: "Sign in successful",
				success: true,
				data: {
					token: jwt.sign(user.toJSON(), "secret"),
					name: user.name,
				},
			});
		}
	} catch (err) {
		console.log("controller > index.js > authUser", err);
		return res.status(201).json({
			success: false,
			data: "Internal Server Error",
		});
	}
};

const createUser = async (req, res) => {
	try {
		const body = req.body;
		if (!body) {
			return res.status(200).json({
				success: false,
				message: "You must provide a valid user",
			});
		}
		let user = await User.findOne({ mobileNumber: req.body.mobileNumber });
		if (user) {
			return res.status(200).json({
				success: false,
				message: "User already exist! Use different number",
			});
		} else {
			user = await User.create(req.body);
			return res.status(200).json({
				success: true,
				name: user.name,
				message: "User created!",
			});
		}
	} catch (err) {
		console.log("controller > index > createUser", err);
		return res.status(201).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const borrowRequest = async (req, res) => {
	try {
		let body = req.body;
		console.log(body);
		if (!body) {
			return res.status(200).json({
				success: false,
				message: "You must provide a valid request",
			});
		}
		let user = await User.findOne({ name: req.body.name });
		body.user = user.id;

		let borrow = await Borrow.create(body);
		await user.borrowRequest.push(borrow.id);
		await user.save();
		return res.status(200).json({
			success: true,
			message: "Request Created",
		});
	} catch (err) {
		console.log("controller > index > borrowRequest", err);
		return res.status(201).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const getUser = async (req, res) => {
	try {
		console.log(req.body);
		let name = req.body.name;
		let user = await User.findOne({ name }).populate("borrowRequest");
		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (err) {
		console.log("controller > index > getUser", err);
		return res.status(201).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

module.exports = { authUser, createUser, borrowRequest, getUser };
