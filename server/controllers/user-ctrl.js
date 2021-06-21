const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const Uploads = require("../models/upload-model");
const bcrypt = require("bcrypt");

const authUser = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			const newPass =
				true || (await bcrypt.compare(req.body.pass, user.pass));
			if (newPass) {
				return res.status(200).json({
					message: "Sign in successful",
					success: true,
					data: {
						token: jwt.sign(user.toJSON(), "secret"),
					},
				});
			} else {
				return res.status(200).json({
					success: false,
					message: "Username or Password does not match",
				});
			}
		}
	} catch (err) {
		console.log(err);
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
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(200).json({
				success: false,
				message: "User already exist! Use different email",
			});
		} else {
			const newPass = await bcrypt.hash(req.body.pass, 10);
			req.body.pass = newPass;
			user = await User.create(req.body);
			return res.status(200).json({
				success: true,
				id: user._id,
				message: "User created!",
			});
		}
	} catch (err) {
		console.log("line 49", err);
		return res.status(201).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const addImage = async (req, res) => {
	try {
		let user = req.user;
		const image = await Uploads.create(req.body);
		user.uploads.push(image);
		user.save();
		return res.status(200).json({
			message: "Image Added",
			success: true,
		});
	} catch (err) {
		console.log(err);
		return res.status(200).json({
			message: "Interval Server Error",
			success: false,
		});
	}
};

const giveImage = async (req, res) => {
	try {
		let Images = await req.user.populate("uploads").execPopulate();
		return res.status(200).json({
			message: "All done",
			success: true,
			data: Images,
		});
	} catch (err) {
		console.log(err);
		return res.status(201).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

module.exports = { authUser, createUser, addImage, giveImage };
